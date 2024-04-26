import React from "react";
import { Link } from "react-router-dom";

export default function InvestmentCard({investment}){
    return (
        <div className="investmentCard">
            <h3>{investment.desc}</h3>
            <p className="category">{investment.category}</p>
            <p>Current Amount: {investment.currentAmount}</p>
            <div className="buttonContainer">
                <button>
                    <Link to={`/investments/withdraw/${investment._id}`}>Withdraw</Link>
                </button>
                <button className="deleteButton">
                    <Link to={`/investments/deposit/${investment._id}`}>Deposit</Link>
                </button>
            </div>
        </div>
    )
}