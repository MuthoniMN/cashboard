import React, { useContext } from 'react'
import './Investments.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import InvestmentCard from '../../components/InvestmentCard/InvestmentCard';

const Investments = () => {
    const {currentUser} = useContext(AuthContext);
    const investments = currentUser.investments;

    return (
        <>
        <Header title='Your Investments' desc='An overview of your investments' />
            <button>
                <Link to={'/investments/add'}>Add Investment</Link>
            </button>
            <section style={{padding: "24px"}}>
                {investments.map(investment => (
                    <InvestmentCard investment={investment} />
                ))}
            </section>
        </>
    )
}

export default Investments;