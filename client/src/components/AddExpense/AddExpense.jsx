import React, { useContext, useState } from 'react';
import './AddExpense.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import validate from '../../utils/validate';
import axios from 'axios';
import updateCurrentUser from '../../utils/updateUser';

// groceries, lifestyle, bill, family & friends, 
const AddExpenseForm = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;
    const [expense, setExpense] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(expense.desc, expense.amount, expense.account, expense.category, expense.date)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.post(`http://localhost:5000/expense/add?user=${currentUser._id}`, {...expense, currency: currentUser.currency});
            
            setSuccess("Expense added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/expenses')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='desc'>Description: </label>
                <input type='text' id='desc' value={expense.desc} onChange={(e) => setExpense( {...expense, desc: e.target.value})} />
            </div>
            <div>
                <label htmlFor='account'>Account: </label>
                <select id='account' value={expense.account}  onChange={(e) => {console.log(e.target.value);setExpense( {...expense, account: e.target.value})}}>
                    <option>Choose an Account</option>
                    {accounts.map(account => (
                        <option value={account._id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='category'>Category: </label>
                <select id='category'value={expense.category} onChange={(e) => setExpense( {...expense, category: e.target.value})} >
                    <option>Choose a Category</option>
                    <option value='groceries' >Groceries</option>
                    <option value='lifestyle'>Lifestyle</option>
                    <option value='bill'>Bill</option>
                    <option value='family & friends'>Family & Friends</option>
                </select>
            </div>
            <div>
                <label htmlFor='date'>Date: </label>
                <input type='date' id='date' value={expense.date} onChange={(e) => setExpense( {...expense, date: e.target.value})} />
            </div>
            <div>
                <label htmlFor='amount'>Amount: </label>
                <input type='number' id='amount' value={expense.amount} onChange={(e) => setExpense( {...expense, amount: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Add Expense" className='btn'  onClick={handleSubmit} />
        </form>
    )
}

export default AddExpenseForm;