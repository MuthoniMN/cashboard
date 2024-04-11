import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import './AddExpense.css';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/AuthContext';
import AddExpenseForm from '../../components/AddExpense/AddExpense';

const AddExpense = () => {
    const {currentUser} = useContext(AuthContext);
    const [expense, setExpense] = useState(currentUser.expenses);
    
    return (
        <>
        <Header title='Your Expenses' desc='An overview of your expenses.' />
        <section>
            <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                <h1>Add Expenses</h1>
                <button>
                    <Link to='/expenses/add'>Back to Expense</Link>
                </button>
            </div>
            <AddExpenseForm />
        </section>
        </>
    )
}

export default AddExpense;