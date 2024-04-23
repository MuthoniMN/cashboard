import React, { useContext } from 'react'
import './Savings.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import SavingsCard from '../../components/SavingsCard/SavingsCard';

const Savings = () => {
    const { currentUser } = useContext(AuthContext);
    const savings = currentUser.savings;
    return (
        <>
            <Header title='Your Savings' desc='An overview of all your saving goals' />
            <button>
                <Link to="/savings/add">Add New Saving</Link>
            </button>
            <section className="flex">
                {
                    savings.map(saving => (
                        <SavingsCard saving={saving} />
                    ))
                }
                {savings.length === 0 && (
                    <h3>No savings Yet</h3>
                )}
            </section>

        </>
    )
}

export default Savings;