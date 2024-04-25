import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function EditSavingForm({value, setValue, handleSubmit, error, success}){
    const {currentUser} = useContext(AuthContext);
    const accounts = currentUser.accounts;

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='amount'>Deposit: </label>
                <input type='number' id='amount' value={value.amount} onChange={(e) => setValue( {...value, amount: e.target.value})} />
            </div>
            <div>
                <label htmlFor='account'>Account: </label>
                <select id='account' value={value.account}  onChange={(e) => setValue( {...value, account: e.target.value})}>
                    <option>Choose an Account</option>
                    {accounts.map(account => (
                        <option value={account._id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='date'>Date: </label>
                <input type='date' id='date' value={value.date} onChange={(e) => setValue( {...value, date: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Update Goal" className='btn'  onClick={(e) => handleSubmit(e)} />
        </form>
    )
}