import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import validate from "../../utils/validate";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import updateCurrentUser from "../../utils/updateUser";

const AccountForm = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(account.name, account.desc, account.currentAmount)){
            setError("Please fill all the fields!")
            return;
        }

        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/account/add?user=${currentUser._id}`, {...account, currency: currentUser.currency});
            
            setSuccess("Account added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            console.log(updated)
            setCurrentUser(updated);
            navigate('/accounts')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }
    return (
        <form className="dashboard">
            <div>
                <label htmlFor='name'>Name: </label>
                <input type='text' id='name' value={account.name} onChange={(e) => setAccount( {...account, name: e.target.value})} />
            </div>
            <div>
                <label htmlFor='desc'>Description: </label>
                <input type='text' id='desc' value={account.desc} onChange={(e) => setAccount( {...account, desc: e.target.value})} />
            </div>
            <div>
                <label htmlFor='amount'>Current Amount: </label>
                <input type='number' id='amount' value={account.amount} onChange={(e) => setAccount( {...account, currentAmount: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Add Account" className='btn' onClick={handleSubmit} />
        </form>
    )
}

export default AccountForm;