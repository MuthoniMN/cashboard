import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import EditSavingForm from "../../components/EditSaving/EditSaving";

export default function EditSaving() {
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();
    const saving = currentUser.savings.find(saving => saving._id === id);
    return (
        <>
            <Header title={'Edit Expense'} desc={'Deposit into a savings'} />
            <section>
                <h3>{saving.desc}</h3>
                <p>Goal: {saving.goal}</p>
                <EditSavingForm id={saving._id} />
            </section>
        </>
    )
}