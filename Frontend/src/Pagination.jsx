import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const [activePage, setActivePage] = useState(1);

    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handleClick = (num) => {
        setActivePage(num);
    }

    return (
        <div className="d-flex justify-content-center m-4">
            <ul className="pageNumbers d-flex">
                {pageNumbers.map((num) => (
                    <li key={num} className={`pageNumber m-1  ${activePage === num ? "activePage" : ""}`} onClick={() => {
                        handleClick(num);
                        paginate(num);
                    }}>
                        {num}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Pagination;