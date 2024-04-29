import React from "react";

export default function AccountCard({account}){
    return (
        <div className="accountsOverview" key={account._id}>
            <h3>{account.name}</h3>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p style={{fontStyle: 'italic'}}>Current Balance: </p>
                <p>{account.currency} {account.currentAmount}</p>
            </div>
        </div>
    )
}