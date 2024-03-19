import React, { useContext, useState } from "react";
import './Header.css';
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Header = ({title, desc}) => {
    const { currentUser, setCurrentUser} = useContext(AuthContext);
    console.log(currentUser)
    const [currencyTab, setCurrencyTab] = useState(currentUser.currency);
    const [currency, setCurrency] = useState(currentUser.currency);
    console.log(currencyTab)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function changeCurrency(e){
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.put(`http://localhost:5000/user/${currentUser._id}`, {currency: currency});
            setCurrentUser(response.data)
            setCurrencyTab(currentUser.currency)
            setSuccess("Currency updated!")
        } catch (err) {
            console.error(err);
            setError("Currency not updated!")
        }
    }
    
    return (
        <header>
            <div>
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
            <div>
                <select value={currencyTab} onChange={(e) => setCurrencyTab(e.target.value)}>
                    <option>{currentUser.currency}</option>
                    <option>
                        <button>Change Currency</button>
                    </option>
                </select>
                <h3>@{currentUser.username}</h3>
            </div>
            {currencyTab === "Change Currency" ? <div className="changeCurrency">
                <form onSubmit={(e) => changeCurrency(e)}>
                    <label htmlFor="currency">Currency: </label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                    <input type="submit" value={"Change Currency"} />
                </form>
            </div> : ""}
            <p className={success ? "toast toastSuccess" : error ? "toast toastError" : "toast"}>{success || error}</p>
        </header>
    )
}

export default Header;