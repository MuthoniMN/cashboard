import React, { useContext, useState } from 'react'
import './Investments.css'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import InvestmentCard from '../../components/InvestmentCard/InvestmentCard';
import Pagination from '../../components/Pagination/Pagination';

const Investments = () => {
    const {currentUser} = useContext(AuthContext);
    const investments = currentUser.investments;
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 6;

    const last = currentPage * maxPerPage;
    const first = last - maxPerPage
    const pageData = investments.slice(first, last)

    const paginate = (num) => setCurrentPage(num);
    const back = () => {
        if(currentPage - 1 > 0){
            setCurrentPage(page => page - 1)
        }
    };
    const forward = () => {
        if (currentPage + 1 <= Math.ceil(investments.length / maxPerPage)) {
            setCurrentPage(page => page + 1)
        }
    };

    return (
        <>
        <Header title='Your Investments' desc='An overview of your investments' />
            <button>
                <Link to={'/investments/add'}>Add Investment</Link>
            </button>
            <section style={{padding: "24px"}}>
                {pageData.map(investment => (
                    <InvestmentCard investment={investment} />
                ))}
            </section>
            <Pagination max={maxPerPage} total={investments.length} paginate={paginate} back={back} forward={forward} />
        </>
    )
}

export default Investments;