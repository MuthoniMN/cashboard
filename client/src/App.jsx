import './App.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from "./pages/Login/Login";
import Dashboard from './pages/Dashboard/Dashboard'
import { AuthContext,} from './contexts/AuthContext';
import { useContext } from 'react';

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
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
