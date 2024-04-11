import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import './AddAccount.css';
import Header from '../../components/Header/Header';
import AccountForm from '../../components/AccountForm/AccountForm';

const AddAccount = () => {
    return (
        <>
        <Header title='Add Account' desc='Add a new Account.' />
        <section>
            <AccountForm />
        </section>
        </>
    )
}

export default AddAccount;