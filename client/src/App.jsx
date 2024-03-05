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

function App() {
  const {token }= useContext(AuthContext)
  const isAuthenticated = token !== null

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
