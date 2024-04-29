import React, { useContext } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import MiniCard from "../../components/MiniCard/MiniCard";
import { AuthContext } from "../../contexts/AuthContext";
import Navigation from "../../components/Navigation/Navigation";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import ExpenseOverview from "../../components/ExpenseOverview/ExpenseOverview";
import TopAccounts from "../../components/TopAccounts/TopAccounts";
import TransactionOverview from "../../components/TranasactionOverview/TransactionOverview";

const Dashboard = () => {
  const navMenu = [
    {
      link: '/',
      text: 'Dashboard'
    },
    {
      link: '/accounts',
      text: 'Account'
    },
    {
      link: '/income',
      text: 'Income'
    },
    {
      link: '/expenses',
      text: 'Expense'
    },
    {
      link: '/savings',
      text: 'Savings'
    },
    {
      link: '/investments',
      text: 'Investments'
    }
  ]
  const { currentUser } = useContext(AuthContext);
  const expenses = currentUser.expenses;
  const transactions = currentUser.transactions
  const categories = [];
  const accounts = [];

  expenses.forEach(expense => {
    let index = categories.findIndex(category => category.label === expense.category);
    if (index === -1) {
      categories.push({
        label: expense.category,
        value: expense.amount
      })
    } else {
      categories[index].value += expense.amount
    }
  })

  transactions.forEach(transaction => {
    let index = accounts.findIndex(accounts => accounts._id === transaction.account);
    if (index === -1) {
      let acc = currentUser.accounts.find(account => account._id === transaction.account)
      if (acc) {
        accounts.push({
          ...acc,
          transactions: 1
        })
      }
    } else {
      accounts[index].transactions += 1;
    }
  })
  return (
    <>
      <ContentLayout>
        <Header title='Welcome back!' desc='Overview of your financial tracker.' />
        <section className="dashboard">
        <section className="dashboard_hero">
          <section>
            <MiniCard heading={'Total Balance'} currency={currentUser.currency} value={currentUser.accounts} account />
            <MiniCard heading={'Total Income'} currency={currentUser.currency} value={currentUser.income} />
            <MiniCard heading={'Total Expenses'} currency={currentUser.currency} value={currentUser.expenses} />
          </section>
          <ExpenseOverview data={categories} />
          <TopAccounts accounts={accounts.sort((a, b) => a.transactions - b.transactions).slice(0, 2)} />
        </section>
        <TransactionOverview transactions={transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))} />
        </section>
      </ContentLayout>

      <Navigation links={navMenu} />
    </>
  )
}

export default Dashboard