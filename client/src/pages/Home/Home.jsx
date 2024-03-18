import React from "react";
import "./Home.css"
import Nav from "../../components/Nav/Nav";
import { FaPiggyBank } from "react-icons/fa6";
import { GiBank } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Nav />
            <section className="hero">
                <h1>Take charge of your finances today!</h1>
                <p>We help you figure out where your money goes by tracking your finances</p>
                <button>
                    <Link to={'/register'}>Get Started Now</Link>
                </button>
            </section>
            <section>
                <h2>Our Services</h2>
                <section className="flex">
                    <div>
                        <GiBank style={{color: '#59C3C3', fontSize: '40px'}} />
                        <h3>Tracking Income and Expenses</h3>
                        <p>We help you track your income and where you spend it</p>
                    </div>
                    <div>
                        <FaPiggyBank style={{color: '#59C3C3', fontSize: '40px'}} />
                        <h3>Tracking Savings and Investments</h3>
                        <p>We help you track your savings and investments to help you visualize your financial goals</p>
                    </div>
                    <div>
                        <TbReportAnalytics style={{color: '#59C3C3', fontSize: '40px'}} />
                        <h3>Reports</h3>
                        <p>We generate monthly, bi-annual and annual reports of your finances to help you set your financial goals</p>
                    </div>
                </section>
            </section>
            <section className="hero">
                <h1>Ready to start your personal finance journey?</h1>
                <p>Sign up today and start tracking your finances</p>
                <button>
                    <Link to={'/register'}>Get Started Now</Link>
                </button>
            </section>
        </>
    )
}

export default Home