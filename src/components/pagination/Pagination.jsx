import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./Pagination.module.scss"

const Pagination = ({usersPerPage, totalUsers, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.pagination__container}>
                {pageNumbers.map(number => (
                    <li className={style.pagination__item} key={number}>
                        <NavLink to={`/${number}`} onClick={() => paginate(number)} className={style.pagination__link} activeClassName={style.active}>
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;