import React, { useState } from "react";
import './MiniCard.css';

export default function MiniCard({ heading, value, currency, account=false }) {
    const [duration, setDuration] = useState('');
    let amount = value.reduce((acc, current) => acc + current.currentAmount, 0) || value.reduce((acc, current) => acc + current.amount, 0);
    let today = new Date();
    let lastWeek = new Date(today.getTime() - 7 * 24 * 3600 * 1000);
    let thisMonth = today.getMonth();
    let lastMonth;
    let lastYear = new Date(today.getTime() - 365 * 24 * 3600 * 1000);

    switch (thisMonth) {
        case 1 || 3 || 5 || 7 || 8 || 10 || 12:
            lastMonth = new Date(today.getTime() - 31 * 24 * 3600 * 1000);
            break;

        case 2:
            lastMonth = new Date(today.getTime() - 28 * 24 * 3600 * 1000);
            break;

        default:
            lastMonth = new Date(today.getTime() - 30 * 24 * 3600 * 1000);
            break;
    }

    switch (duration) {
        case 'all time':
            amount = value.reduce((acc, current) => acc + current.currentAmount, 0) || value.reduce((acc, current) => acc + current.amount, 0);
            break;
        case 'this week':
            amount = value.filter(a => new Date(a.date) > lastWeek || new Date(a.payDate) > lastWeek).reduce((acc, current) => acc + current.amount, 0)
            break;
        case 'this month':
            amount = value.filter(a => new Date(a.date) > lastMonth || new Date(a.payDate) > lastMonth).reduce((acc, current) => acc + current.amount, 0)
            break;
        case 'this year':
            amount = value.filter(a => new Date(a.date) > lastYear || new Date(a.payDate) > lastYear).reduce((acc, current) => acc + current.amount, 0)
            break;
    }
    return (
        <div className="summary-card">
            <div>
                <p>{heading}</p>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value='all time'>All Time</option>
                    {!account && (
                    <>
                        <option value='this week'>This Week</option>
                        <option value='this month'>This Month</option>
                        <option value='this year'>This Year</option>
                    </>
                    )}
                </select>
            </div>
            <h2>{currency} {amount}</h2>
        </div>
    )
}