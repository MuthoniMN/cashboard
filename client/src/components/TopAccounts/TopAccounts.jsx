import React from "react";
import AccountCard from "../AccountCard/AccountCard";

export default function TopAccounts({ accounts }){
    return (
        <section>
            <h2>Frequently Used Accounts</h2>
            <section>
                {accounts.map(account => (
                    <AccountCard account={account} />
                ))}
            </section>
        </section>
    )
}