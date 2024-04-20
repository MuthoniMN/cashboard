import React, {useContext} from 'react'
import './Accounts.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {FaTrash} from "react-icons/fa6";
import deleteProperty from '../../utils/delete';
import updateCurrentUser from '../../utils/updateUser';

const Accounts = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;

    async function deleteAccount(id){
        await deleteProperty(`http://localhost:5000/account/${id}?user=${currentUser._id}`);

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
         <table>
            <tr>
                <th>Name</th>
                <th>Desc</th>
                <th>Balance</th>
                <th>Delete</th>
            </tr>
            {accounts.map(account => (
                <tr>
                    <td>{account.name}</td>
                    <td>{account.desc}</td>
                    <td>{account.currency + " " + account.currentAmount}</td>
                    <td>
                        <button className="deleteButton" onClick={() => deleteAccount(account._id)}>
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            ))}
         </table>
        </>
    )
}

export default Accounts;