import React, { useContext } from 'react'
import './Income.css'
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/AuthContext';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Income = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const income = currentUser.income
    return (
        <>
            <Header title='Your Income Sources' desc='An overview of all your income sources' />
            <button>
                <Link to='/income/add'>Add Income</Link>
            </button>
            <section className='incomeSection'>
                {income.map(income => (
                    <Card title={income.source} date={income.payDate} account={income.account} amount={income.amount} currency={income.currency} id={income._id} />
                ))}
                {income.length === 0 && (
                    <h3>No Income Yet</h3>
                )}
            </section>
        </>
    )
}

export default Income;