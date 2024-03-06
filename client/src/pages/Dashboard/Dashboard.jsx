import React from "react";
import "./Dashboard.css";
import Navigation from "../../components/Navigation/Navigation";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import Header from "../../components/Header/Header";

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
    return (
      <>
        <Navigation links={navMenu}/>
        <ContentLayout>
          <Header title='Welcome back!' desc='Overview of your financial tracker.' />
            <h1>Dashboard</h1>
        </ContentLayout>
      </>
    )
}

export default Dashboard