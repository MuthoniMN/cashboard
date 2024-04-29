import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import validate from "../../utils/validate";
import updateCurrentUser from "../../utils/updateUser";
import EditSavingForm from "../../components/EditSaving/EditSaving";

export default function EditSaving() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { id } = useParams();
    const saving = currentUser.savings.find(saving => saving._id === id);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const [value, setValue] = useState(saving);


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
            const data = await axios.put(`${process.env.REACT_APP_BACKEND_API}/savings/${id}?user=${currentUser._id}`, {...value});
            
            setSuccess("Savings updated successfully!")

            let updated = await updateCurrentUser(currentUser._id);
            setCurrentUser(updated);
            navigate('/savings')
            
        } catch (error) {
            console.error(error);
            setError("Please try again!!")
        }
    }

    return (
        <>
            <Header title={'Edit Saving'} desc={'Deposit into a savings account'} />
            <section>
                <h3>{saving.desc}</h3>
                <p>Goal: {saving.goal}</p>
                <EditSavingForm value={value} setValue={setValue} handleSubmit={handleSubmit} error={error} success={success} />
            </section>
        </>
    )
}