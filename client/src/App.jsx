import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from "./pages/Login/Login";
import Dashboard from './pages/Dashboard/Dashboard'
import { AuthContext,} from './contexts/AuthContext';
import { useContext } from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import Accounts from './pages/Accounts/Accounts';
import Income from './pages/Income/Income';
import Expenses from './pages/Expenses/Expenses';
import Savings from './pages/Savings/Savings';
import Investments from './pages/Investments/Investments';
import AddExpense from './pages/AddExpense/AddExpense';
import AddAccount from './pages/AddAccount/AddAccount';
import AddIncome from './pages/AddIncome/AddIncome';
import AddSaving from './pages/AddSaving/AddSaving';
import EditSaving from './pages/EditSaving/EditSaving';
import AddInvestment from './pages/AddInvestment/AddInvestment';
import DepositInvestment from './pages/DepositInvestment/DepositInvestment';
import WithdrawInvestment from './pages/WithdrawInvestment/WithdrawInvestment';

function App() {
  const { currentUser }= useContext(AuthContext)
  const isAuthenticated = currentUser !== null
  console.log(isAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <Dashboard /> : <Home />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: '/accounts',
          element: isAuthenticated ? <Accounts /> : <Login />
        },
        {
          path: '/income',
          element: isAuthenticated ? <Income /> : <Login />
        },
        {
          path: '/expenses',
          element: isAuthenticated ? <Expenses /> : <Login />
        },
        {
          path: '/expenses/add',
          element: isAuthenticated ? <AddExpense /> : <Login />,
        },
        {
          path: '/accounts/add',
          element: isAuthenticated ? <AddAccount /> : <Login />,
        },
        {
          path: '/income/add',
          element: isAuthenticated ? <AddIncome /> : <Login />,
        },
        {
          path: '/savings/add',
          element: isAuthenticated ? <AddSaving /> : <Login />,
        },
        {
          path: '/savings/edit/:id',
          element: isAuthenticated ? <EditSaving /> : <Login />,
        },
        {
          path: '/investments/add',
          element: isAuthenticated ? <AddInvestment /> : <Login />,
        },
        {
          path: '/investments/deposit/:id',
          element: isAuthenticated ? <DepositInvestment /> : <Login />,
        },
        {
          path: '/investments/withdraw/:id',
          element: isAuthenticated ? <WithdrawInvestment /> : <Login />,
        },
        {
          path: '/savings',
          element: isAuthenticated ? <Savings /> : <Login />
        },
        {
          path: '/investments',
          element: isAuthenticated ? <Investments /> : <Login />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
