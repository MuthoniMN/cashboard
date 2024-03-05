import React from "react";
import "./Dashboard.css";
import Navigation from "../../components/Navigation/Navigation";
import ContentLayout from "../../components/ContentLayout/ContentLayout";

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
            <h1>Dashboard</h1>
        </ContentLayout>
      </>
    )
}

export default Dashboard