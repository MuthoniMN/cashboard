import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Pagination from "../Pagination/Pagination";

export default function TransactionOverview({ transactions }) {
    const { currentUser } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 3;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = transactions.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if(currentPage - 1 > 0){
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 <= Math.ceil(transactions.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };

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
                    {transactions && pageData.map(t => {
                        const date = new Date(t.timestamp);
                        let desc = "";
                        const account = currentUser.accounts.find(account => account._id === t.account) || "Invalid"

                        switch (t.type) {
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
                                {t.type === 'expenses' && <td style={{ color: 'red', fontWeight: 'bold' }}>-{t.amount}</td>}
                                {t.type === 'income' && <td style={{ color: 'green', fontWeight: 'bold' }}>{t.amount}</td>}
                                {t.type === 'savings' && <td style={{ color: 'yellow', fontWeight: 'bold' }}>{t.amount}</td>}
                                {t.type === 'investments' && <td style={{ color: 'orange', fontWeight: 'bold' }}>{t.amount}</td>}
                            </tr>
                        )
                    })}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan={4}>No Transactions Yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination max={maxPerPage} total={transactions.length} paginate={paginate} back={back} forward={forward} />
        </section>
    )
}