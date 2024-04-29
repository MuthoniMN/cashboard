import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import validate from '../../utils/validate';
import axios from 'axios';
import updateCurrentUser from '../../utils/updateUser';
const IncomeForm = ( { investment } ) => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;
    const [income, setIncome] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    if(investment){
        income.source = investment._id;
        income.category = 'investment';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(income.source, income.amount, income.account, income.category, income.payDate)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/income/add?user=${currentUser._id}`, {...income, currency: currentUser.currency});
            
            setSuccess("Income added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            investment ? navigate('/income') : navigate('/investments')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='desc'>Income Source: </label>
                <input type='text' id='desc' value={income.source} onChange={(e) => setIncome( {...income, source: e.target.value})} disabled={investment ? true : false} />
            </div>
            <div>
                <label htmlFor='account'>Account: </label>
                <select id='account' value={income.account}  onChange={(e) => {console.log(e.target.value);setIncome( {...income, account: e.target.value})}}>
                    <option>Choose an Account</option>
                    {accounts.map(account => (
                        <option value={account._id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='category'>Category: </label>
                <select id='category'value={income.category} onChange={(e) => setIncome( {...income, category: e.target.value})}  disabled={investment ? true : false} >
                    <option>Choose a Category</option>
                    <option value='Job' >Job</option>
                    <option value='Business'>Business</option>
                    <option value='Side Hustle'>Side Hustle</option>
                    <option value='Investment' defaultChecked={investment ? true : false}>Investment</option>
                    <option value='family & friends'>Family & Friends</option>
                </select>
            </div>
            <div>
                <label htmlFor='date'>Date: </label>
                <input type='date' id='date' value={income.payDate} onChange={(e) => setIncome( {...income, payDate: e.target.value})} />
            </div>
            <div>
                <label htmlFor='amount'>Amount: </label>
                <input type='number' id='amount' value={income.amount} onChange={(e) => setIncome( {...income, amount: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Add income" className='btn'  onClick={handleSubmit} />
        </form>
    )
}

export default IncomeForm;