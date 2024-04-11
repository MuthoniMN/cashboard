import React, { useState } from 'react';
import './AddExpense.css';

// groceries, lifestyle, bill, family & friends, 

const AddExpenseForm = () => {
    const [expense, setExpense] = useState({});
    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='desc'>Description: </label>
                <input type='text' id='desc' value={expense.desc} onChange={(e) => setExpense( {...expense, desc: e.target.value})} />
            </div>
            <div>
                <label htmlFor='category'>Category: </label>
                <select type='text' id='category'value={expense.category} onChange={(e) => setExpense( {...expense, category: e.target.value})} >
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

            <input type="submit" value="Add Expense" className='btn' />
        </form>
    )
}

export default AddExpenseForm;