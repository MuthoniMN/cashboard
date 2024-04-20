import React from 'react';
import Header from '../../components/Header/Header';
import IncomeForm from '../../components/IncomeForm/IncomeForm';

const AddIncome = () => {
    return (
        <>
        <Header title='Add Income Source' desc='Add a new income source.' />
        <section>
            <IncomeForm />
        </section>
        </>
    )
}

export default AddIncome;