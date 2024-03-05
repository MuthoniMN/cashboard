import React, { useState } from "react";
import "./Register.css";
import {Link, useNavigate} from 'react-router-dom'
import validate from "../../utils/validate";
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setError('')
        
        if(validate.isEmpty(user.email, user.password, user.username)){
            setError("Please fill all the fields!")
            return;
        }else if(!validate.validatePassword(user.password)){
            setError("Please enter a strong password")
            return;
        }
//"Amin56der"
        try {
            const data = await axios.post("http://localhost:5000/user/add", user)
            
            setSuccess("Registration Successful! Please login")

            navigate('/login')
            
        } catch (error) {
            console.error(error);
            setError("Registration failed!")
        }
    }
    return (
        <>
            <h1>Register for Cashboard</h1>
            <p>
                <Link to={'/'} style={{textDecoration: 'underline'}}>Back to Home &gt;</Link>
            </p>

            <section>
                <form onSubmit={handleSubmit} className="regular-form">
                    <div className="inputContainer">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" onChange={(e) => setUser({...user, email: e.target.value})} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" placeholder="johnDoe222" onChange={(e) => setUser({...user, username: e.target.value})} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" placeholder="Secure Pa$$word" onChange={(e) => setUser({...user, password: e.target.value})}/>
                    </div>
                    <p className={error ? 'error' : 'success'}>{error || success}</p>
                    <button type="submit">Register</button>
                </form>
            </section>
        </>
    )
}

export default Register