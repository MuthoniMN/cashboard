import React, { useContext, useState } from 'react'
import './Accounts.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FaTrash } from "react-icons/fa6";
import deleteProperty from '../../utils/delete';
import updateCurrentUser from '../../utils/updateUser';
import Pagination from '../../components/Pagination/Pagination';

const Accounts = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const accounts = currentUser.accounts;
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 5;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = accounts.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 <= Math.ceil(accounts.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };

    async function deleteAccount(id) {
        await deleteProperty(`account/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
        console.log(currentUser);
    }
    return (
        <>
            <Header title='Your Accounts' desc='An overview of all your accounts' />
            <button>
                <Link to={'/accounts/add'}>Add an Account</Link>
            </button>
            <section className='table_container'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Balance</th>
                            <th className='deleteColumn'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.map(account => (
                            <tr key={account._id}>
                                <td>{account.name}</td>
                                <td>{account.desc}</td>
                                <td>{account.currency + " " + account.currentAmount}</td>
                                <td className='deleteColumn'>
                                    <button className="deleteButton" onClick={() => deleteAccount(account._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {accounts.length === 0 && (
                            <tr>
                                <td colSpan={4}>No Accounts Added</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <Pagination max={maxPerPage} total={accounts.length} paginate={paginate} back={back} forward={forward} />
        </>
    )
}

export default Accounts;