import React, { useContext, useEffect, useState } from "react";
import './Header.css';
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import getCurrencies from "../../utils/currencies";

const Header = ({title, desc}) => {
    const { currentUser, setCurrentUser} = useContext(AuthContext);
    const [currency, setCurrency] = useState(currentUser.currency);
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        async function listCurrency(){
            let c = await getCurrencies();
            setCurrencies([...Object.keys(c), 'KSH']);
        }

        listCurrency();
    }, [])

    useEffect(() => {
        async function changeCurrency(){
            setError("");
            setSuccess("");
            try {
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/user/${currentUser._id}`, {currency: currency});
                setCurrentUser(response.data)
                setSuccess("Currency updated!")
            } catch (err) {
                console.error(err);
                setError("Currency not updated!")
            }
        }

        // changeCurrency();

        return () => changeCurrency;
    }, [currency])
    
    return (
        <header>
            <div className="title_section">
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
            <div>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option>{currentUser.currency}</option>
                   {currencies.filter(a => a !== currency).map((currency) => (<option key={currency}>{currency}</option>))}
                </select>
                <h3>@{currentUser.username}</h3>
            </div>
            <p className={success ? "toast toastSuccess" : error ? "toast toastError" : "toast"}>{success || error}</p>
        </header>
    )
}

export default Header;