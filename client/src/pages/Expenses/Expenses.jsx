import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import './Expenses.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import { AuthContext } from '../../contexts/AuthContext';

const Expenses = () => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
    const [expenses, setExpenses] = useState(currentUser.expenses)
    console.log(expenses)
    const [categories, setCategories] = useState([]);
    
    return (
        <>
        <Header title='Your Expenses' desc='An overview of your expenses.' />
        <section>
            <h1>Expenses</h1>
            <button>
                <Link to='/expenses/add'>Add an Expense</Link>
            </button>
            <Categories heading="Where did your money go?" categories={categories} />
        </section>
        </>
    )
}

export default Expenses;