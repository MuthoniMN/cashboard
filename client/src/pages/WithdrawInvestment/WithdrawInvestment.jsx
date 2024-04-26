import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import IncomeForm from "../../components/IncomeForm/IncomeForm";

export default function WithdrawInvestment() {
    const { currentUser} = useContext(AuthContext);
    const { id } = useParams();
    const investment = currentUser.investments.find(investment => investment._id == id);
    console.log(investment);

    return (
        <>
            <Header title={'Edit Investment'} desc={'Withdraw from an investments account'} />
            <section>
                <h3>{investment.desc}</h3>
                <p>Amount: {investment.currentAmount}</p>
                <IncomeForm investment={investment} />
            </section>
        </>
    )
}