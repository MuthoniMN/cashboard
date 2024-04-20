import React from 'react';
import './AddExpense.css';
import Header from '../../components/Header/Header';
import AddExpenseForm from '../../components/AddExpense/AddExpense';

const AddExpense = () => {
    return (
        <>
        <Header title='Add Expenses' desc='Add a new expense.' />
        <section>
            <AddExpenseForm />
        </section>
        </>
    )
}

export default AddExpense;