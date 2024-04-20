import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import './Expenses.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import { AuthContext } from '../../contexts/AuthContext';
import {FaTrash} from "react-icons/fa6";
import deleteProperty from '../../utils/delete';
import updateCurrentUser from '../../utils/updateUser';

const Expenses = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const expenses = currentUser.expenses;  
    const categories = [];

    expenses.forEach(expense => {
        let index = categories.findIndex(category => category.name === expense.category);
        console.log(expense.category)
        console.log(index)
        if(index === -1){
            categories.push({
                name: expense.category,
                total: expense.amount
            })
        }else{
            categories[index].total += expense.amount
        }
    })

    async function deleteExpense(id){
        await deleteProperty(`http://localhost:5000/expense/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
        console.log(currentUser);
    }
    let t = new Date().toLocaleDateString();
    console.log(t)
    
    return (
        <>
        <Header title='Your Expenses' desc='An overview of your expenses.' />
        <section style={{textAlign: 'left'}}>
            <button>
                <Link to='/expenses/add'>Add an Expense</Link>
            </button>
            <section className='expensesTable'>
                <table>
                <tr>
                    <th>Date</th>
                    <th>Desc</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Delete</th>
                </tr>
                {expenses.map(expense =>{ 
                        let date = new Date(expense.date)
                    return (
                    <tr>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{expense.desc}</td>
                        <td>{expense.category}</td>
                        <td>{expense.currency + " " + expense.amount}</td>
                        <td>
                            <button onClick={() => deleteExpense(expense._id)}>
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                )})}
            </table>
            </section>
            
            <Categories heading="Where did your money go?" categories={categories} />
        </section>
        </>
    )
}

export default Expenses;