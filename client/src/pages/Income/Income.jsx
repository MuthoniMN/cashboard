import React, { useContext, useState } from 'react'
import './Income.css'
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { FaTrash } from "react-icons/fa6";
import deleteProperty from "../../utils/delete";
import updateCurrentUser from "../../utils/updateUser";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const Income = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const income = currentUser.income;
    const accounts = currentUser.accounts;

    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 7;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = income.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 < Math.ceil(income.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };

    async function deleteIncome(id) {
        await deleteProperty(`http://localhost:5000/income/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
        console.log(currentUser);
    }
    return (
        <>
            <Header title='Your Income Sources' desc='An overview of all your income sources' />
            <button>
                <Link to='/income/add'>Add Income</Link>
            </button>
            <section className='table_container'>
                <table>
                    <tr>
                        <th>Income Source</th>
                        <th>Date</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th className='deleteColumn'>Delete</th>
                    </tr>
                    {pageData.map(income => {
                        let date = new Date(income.payDate).toLocaleDateString();
                        let account = accounts.find(acc => income.account == acc._id)
                        return (
                            <tr>
                                <td>{income.source}</td>
                                <td>{date}</td>
                                <td>{account.desc}</td>
                                <td>{income.currency + " " + income.amount}</td>
                                <td className='deleteColumn'>
                                    <button className="deleteButton" onClick={() => deleteIncome(income._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {income.length === 0 && (
                        <tr>
                            <td colSpan={4}>No Accounts Added</td>
                        </tr>
                    )}
                </table>
            </section>
            <Pagination max={maxPerPage} total={income.length} paginate={paginate} back={back} forward={forward} />
        </>
    )
}

export default Income;