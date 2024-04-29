import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import validate from '../../utils/validate';
import axios from 'axios';
import updateCurrentUser from '../../utils/updateUser';
const InvestmentForm = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;
    const [investment, setInvestment] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(investment.desc, investment.amount, investment.account, investment.category, investment.date)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/investment/add?user=${currentUser._id}`, {...investment, currency: currentUser.currency});
            
            setSuccess("investment added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/investments')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='desc'>Description: </label>
                <input type='text' id='desc' value={investment.desc} onChange={(e) => setInvestment( {...investment, desc: e.target.value})} />
            </div>
            <div>
                <label htmlFor='category'>Category: </label>
                <select id='category'value={investment.category} onChange={(e) => setInvestment( {...investment, category: e.target.value})} >
                    <option>Choose a Category</option>
                    <option value='Money Market Fund' >Money Market Fund</option>
                    <option value='Sacco'>Sacco</option>
                    <option value='Real Estate'>Real Estate</option>
                    <option value='Bonds and Shares'>Bonds and Shares</option>
                    <option value='Cryptocurrency'>Cryptocurrency</option>
                </select>
            </div>
            <div>
                <label htmlFor='account'>Account: </label>
                <select id='account' value={investment.account}  onChange={(e) => setInvestment( {...investment, account: e.target.value})}>
                    <option>Choose an Account</option>
                    {accounts.map(account => (
                        <option value={account._id}>{account.name}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor='amount'>Starting Amount: </label>
                <input type='number' id='amount' value={investment.amount} onChange={(e) => setInvestment( {...investment, amount: e.target.value})} />
            </div>
            <div>
                <label htmlFor='date'>Date: </label>
                <input type='date' id='date' value={investment.date} onChange={(e) => setInvestment( {...investment, date: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Add Investment" className='btn'  onClick={handleSubmit} />
        </form>
    )
}

export default InvestmentForm;