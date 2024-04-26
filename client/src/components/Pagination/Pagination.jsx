import React from "react";
import './Pagination.css';
import { FaArrowLeft, FaArrowRight, FaCaretLeft, FaCaretRight } from 'react-icons/fa6';

const Pagination = ({ max, total, paginate, back, forward }) => {
    let pages = [];

    for(let a = 1; a <= Math.ceil(total / max); a++){
        pages.push(a);
    }

    return (
        <div className="pages">
            <a onClick={back}>
                <FaCaretLeft />
            </a>
            {pages.map(page => (
                <a href="#" onClick={() => paginate(page)} key={page}>{page}</a>
            ))}
            <a onClick={forward}>
                <FaCaretRight />
            </a>
        </div>
    )
}

export default Pagination;