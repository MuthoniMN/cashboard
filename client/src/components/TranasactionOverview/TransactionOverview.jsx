import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function TransactionOverview({ transactions }){
    const { currentUser } = useContext(AuthContext);
    return (
        <section className="transactions">
            <h2>Recent Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Account</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => {
                        const date = new Date(t.timestamp);
                        let desc = "";
                        const account = currentUser.accounts.find(account => account._id === t.account) || "Invalid"
                        console.log(account);

                        switch(t.type){
                            case "expenses":
                                desc = currentUser.expenses.find(expense => expense._id === t.typeId) ? currentUser.expenses.find(expense => expense._id === t.typeId).desc : "";
                                break;
                            case "income":
                                desc = currentUser.income.find(income => income._id === t.typeId).source;
                                break;
                            case "savings":
                                desc = currentUser.savings.find(saving => saving._id === t.typeId).desc;
                                break;
                            case "investments":
                                desc = currentUser.investments.find(investment => investment._id === t.typeId).desc;
                                break;
                        }

                        return (
                            <tr>
                                <td>{desc}</td>
                                <td>{account.desc}</td>
                                <td>{date.toLocaleDateString()}</td>
                                {t.type === 'expenses' && <td style={{color: 'red', fontWeight: 'bold'}}>-{t.amount}</td>}
                                {t.type === 'income' && <td style={{color: 'green', fontWeight: 'bold'}}>{t.amount}</td>}
                                {t.type === 'savings' && <td style={{color: 'yellow', fontWeight: 'bold'}}>{t.amount}</td>}
                                {t.type === 'investments' && <td style={{color: 'orange', fontWeight: 'bold'}}>{t.amount}</td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}