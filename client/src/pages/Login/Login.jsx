import React, { useContext, useState } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import validate from "../../utils/validate";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
    //  "12Qu33ns"  test5
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { setToken, setCurrentUser } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")

        if(validate.isEmpty(user.password, user.username)){
            setError("Please fill all the fields!")
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, user)
            setSuccess("Login Successful!")
            setCurrentUser(res.data.user)
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token )
            navigate('/')
        } catch (error) {
            console.error(error)
            setToken(null)
            setError("Login Failed!")
        }
    }
    return (
        <>
            <h1>Login</h1>
            <p>
                <Link to={'/'}>Back to Home</Link>
            </p>

            <section>
                <form className="regular-form" onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" placeholder="johnDoe222" onChange={(e) => setUser({...user, username: e.target.value})} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" placeholder="Secure Pa$$word" onChange={(e) => setUser({...user, password: e.target.value})} />
                    </div>
                    <p className={error ? 'error' : 'success'}>{error || success}</p>
                    <input type="submit" value="Login" />
                </form>
            </section>
        </>
    )
}

export default Login