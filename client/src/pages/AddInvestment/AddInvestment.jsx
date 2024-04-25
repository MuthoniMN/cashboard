import React from 'react';
import Header from '../../components/Header/Header';
import InvestmentForm from '../../components/InvestmentForm/InvestmentForm';

const AddInvestment = () => {
    return (
        <>
        <Header title='Add Investment' desc='Add a new investment.' />
        <section>
            <InvestmentForm />
        </section>
        </>
    )
}

export default AddInvestment;