import React, { useContext, useState } from 'react'
import './Savings.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import SavingsCard from '../../components/SavingsCard/SavingsCard';
import Pagination from '../../components/Pagination/Pagination';

const Savings = () => {
    const { currentUser } = useContext(AuthContext);
    const savings = currentUser.savings;
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 3;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = savings.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if(currentPage - 1 > 0){
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 <= Math.ceil(savings.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };
    return (
        <>
            <Header title='Your Savings' desc='An overview of all your saving goals' />
            <button>
                <Link to="/savings/add">Add New Saving</Link>
            </button>
            <section className="flex">
                {
                    savings.map(saving => (
                        <SavingsCard saving={saving} />
                    ))
                }
                {savings.length === 0 && (
                    <h3>No savings Yet</h3>
                )}
            </section>
            <Pagination max={maxPerPage} total={savings.length} paginate={paginate} back={back} forward={forward} />
        </>
    )
}

export default Savings;