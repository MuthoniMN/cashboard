import React from "react";
import Header from "../../components/Header/Header";
import SavingsForm from "../../components/SavingsForm/SavingsForm";

export default function AddSaving() {
    return (
        <>
            <Header title="Add a new saving" desc="Set a new saving goal" />
            <SavingsForm />
        </>
    )
}