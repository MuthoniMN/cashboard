import React, { useContext } from "react";
import './Card.css'
import { AuthContext } from "../../contexts/AuthContext";
import { FaTrash } from "react-icons/fa6";
import deleteProperty from "../../utils/delete";
import updateCurrentUser from "../../utils/updateUser";

export default function Card({ title, date, account, amount, currency, id }) {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    let dateStr = new Date(date).toLocaleDateString();
    let acc = currentUser.accounts.find(acc => acc._id === account)

    async function deleteIncome(id){
        await deleteProperty(`http://localhost:5000/income/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
        console.log(currentUser);
    }
    return (
        <div className="card">
            <div className="card_header">
                <h4>{title}</h4>
                <span>{dateStr}</span>
            </div>
            <p>{acc.name}</p>
            <p className="amount"><span>{currency} </span>{amount}</p>
            <button className="deleteButton" onClick={() => deleteIncome(id)}>
                <FaTrash />
            </button>
        </div>
    )
}