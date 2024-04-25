import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import validate from "../../utils/validate";
import updateCurrentUser from "../../utils/updateUser";
import EditSavingForm from "../../components/EditSaving/EditSaving";

export default function DepositInvestment() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { id } = useParams();
    const investment = currentUser.investments.find(investment => investment._id === id);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate();
    const [value, setValue] = useState(investment);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(validate.isEmpty(value.amount, value.date, value.account)){
            setError("Please fill all the fields!")
            return;
        }
{}
        try {
            const data = await axios.put(`http://localhost:5000/investments/${id}?user=${currentUser._id}`, {...value});
            
            setSuccess("Investment added successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/investments')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <>
            <Header title={'Edit Investment'} desc={'Deposit into an investments account'} />
            <section>
                <h3>{investment.desc}</h3>
                <p>Amount: {investment.currentAmount}</p>
                <EditSavingForm value={value} setValue={setValue} handleSubmit={handleSubmit} error={error} success={success} />
            </section>
        </>
    )
}