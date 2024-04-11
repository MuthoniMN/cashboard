import React, {useContext, useState} from 'react'
import './Accounts.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Accounts = () => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
    const [accounts, setAccounts] = useState(currentUser.accounts);
    return (
        <>
        <Header title='Your Accounts' desc='An overview of all your accounts' />
         <button>
            <Link to={'/accounts/add'}>Add an Account</Link>
         </button>
         <table>
            <tr>
                <th>Name</th>
                <th>Desc</th>
                <th>Balance</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {accounts.map(account => (
                <tr>
                    <td>{account.name}</td>
                    <td>{account.desc}</td>
                    <td>{account.currency + " " + account.currentAmount}</td>
                </tr>
            ))}
         </table>
        </>
    )
}

export default Accounts;