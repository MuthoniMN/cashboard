import Navigation from '../Navigation/Navigation'
import ContentLayout from '../ContentLayout/ContentLayout'
import { Outlet } from "react-router-dom";

function MainLayout() {
  const navMenu = [
    {
      link: '/',
      text: 'Dashboard'
    },
    {
      link: '/account',
      text: 'Account'
    },
    {
      link: '/income',
      text: 'Income'
    },
    {
      link: '/expense',
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
      <ContentLayout>
        <Outlet />
      </ContentLayout>
      <Navigation links={navMenu} />
    </>
  )
}

export default MainLayout;
