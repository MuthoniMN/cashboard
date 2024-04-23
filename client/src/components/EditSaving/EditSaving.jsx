import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validate from "../../utils/validate";
import updateCurrentUser from "../../utils/updateUser";
import { AuthContext } from "../../contexts/AuthContext";

export default function EditSavingForm({id}){
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;
    const [savings, setSavings] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(savings.amount, savings.date, savings.account)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.put(`http://localhost:5000/savings/${id}?user=${currentUser._id}`, {...savings});
            
            setSuccess("savings added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/savings')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='amount'>Deposit: </label>
                <input type='number' id='amount' value={savings.amount} onChange={(e) => setSavings( {...savings, amount: e.target.value})} />
            </div>
            <div>
                <label htmlFor='account'>Account: </label>
                <select id='account' value={savings.account}  onChange={(e) => setSavings( {...savings, account: e.target.value})}>
                    <option>Choose an Account</option>
                    {accounts.map(account => (
                        <option value={account._id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='date'>Date: </label>
                <input type='date' id='date' value={savings.date} onChange={(e) => setSavings( {...savings, date: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Update Goal" className='btn'  onClick={(e) => handleSubmit(e, id)} />
        </form>
    )
}