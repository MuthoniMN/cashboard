import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validate from "../../utils/validate";
import updateCurrentUser from "../../utils/updateUser";
import { AuthContext } from "../../contexts/AuthContext";

export default function SavingsForm(){
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [savings, setSavings] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(savings.goal, savings.desc)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.post(`http://localhost:5000/savings/add?user=${currentUser._id}`, {...savings, currency: currentUser.currency, currentAmount: 0});
            
            setSuccess("savings added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/savings')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <form className='dashboard'>
            <div>
                <label htmlFor='desc'>Description: </label>
                <input type='text' id='desc' value={savings.desc} onChange={(e) => setSavings( {...savings, desc: e.target.value})} />
            </div>
            <div>
                <label htmlFor='amount'>Goal Amount: </label>
                <input type='number' id='amount' value={savings.goal} onChange={(e) => setSavings( {...savings, goal: e.target.value})} />
            </div>
            <p className={error ? 'error' : 'success'}>{error || success}</p>

            <input type="submit" value="Add Goal" className='btn'  onClick={handleSubmit} />
        </form>
    )
}