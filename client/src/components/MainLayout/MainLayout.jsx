import Navigation from './components/Navigation/Navigation'
import ContentLayout from './components/ContentLayout/ContentLayout'

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
        <h1>Cashboard App</h1>
      </ContentLayout>
      <Navigation links={navMenu} />
    </>
  )
}

export default MainLayout;
