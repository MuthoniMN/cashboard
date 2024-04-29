import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import deleteProperty from "../../utils/delete";
import updateCurrentUser from "../../utils/updateUser";
import { FaTrash, FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SavingsCard({ saving }) {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    async function deleteSaving(id) {
        await deleteProperty(`${process.env.REACT_APP_BACKEND_API}/savings/${id}?user=${currentUser._id}`);

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
    }
    return (
        <div className="savingsCard">
            <h3>{saving.desc}</h3>
            <p>Goal: {saving.goal}</p>
            <p>Amount: {saving.currentAmount}</p>
            <div className="barContainer">
                <div className="bar" style={{width: `${(saving.currentAmount / saving.goal) * 100 }%`, height: '100%'}}>
                    {`${Math.round((saving.currentAmount / saving.goal) * 100)}%`}
                </div>
            </div>
            <div className="flex">
                <button>
                    <Link to={`/savings/edit/${saving._id}`} >
                        <FaPen />
                    </Link>
                </button>
                <button className="deleteButton" onClick={() => deleteSaving(saving._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}