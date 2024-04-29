import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import './Expenses.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import { AuthContext } from '../../contexts/AuthContext';
import { FaTrash } from "react-icons/fa6";
import deleteProperty from '../../utils/delete';
import updateCurrentUser from '../../utils/updateUser';
import Pagination from '../../components/Pagination/Pagination';

const Expenses = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const expenses = currentUser.expenses;
    const categories = [];
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 7;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = expenses.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 <= Math.ceil(expenses.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };

    expenses.forEach(expense => {
        let index = categories.findIndex(category => category.name === expense.category);
        if (index === -1) {
            categories.push({
                name: expense.category,
                total: expense.amount
            })
        } else {
            categories[index].total += expense.amount
        }
    })

    async function deleteExpense(id) {
        await deleteProperty(`${process.env.REACT_APP_BACKEND_API}/expense/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
    }

    return (
        <>
            <Header title='Your Expenses' desc='An overview of your expenses.' />
            <section className='expensesContainer' style={{ textAlign: 'left' }}>
                <div style={{ marginTop: "85px", flexGrow: "3" }}>
                    <button>
                        <Link to='/expenses/add'>Add an Expense</Link>
                    </button>
                    <section className='expensesTable'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Desc</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th className='deleteColumn'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map(expense => {
                                    let date = new Date(expense.date)
                                    return (
                                        <tr key={expense._id}>
                                            <td>{date.toLocaleDateString()}</td>
                                            <td>{expense.desc}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.currency + " " + expense.amount}</td>
                                            <td className='deleteColumn'>
                                                <button className="deleteButton" onClick={() => deleteExpense(expense._id)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {expenses.length === 0 && (
                                    <tr>
                                        <td colSpan={5}>No Expenses Yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination max={maxPerPage} total={expenses.length} paginate={paginate} back={back} forward={forward} />
                    </section>
                </div>
                <Categories heading="Where did your money go?" categories={categories} />
            </section>
        </>
    )
}

export default Expenses;