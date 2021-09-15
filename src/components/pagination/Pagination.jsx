import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import style from "./Pagination.module.scss"

const Pagination = ({usersPerPage, totalUsers, pageNumber}) => {
    const pageNumbers = [];
    const history = useHistory();
    const currentPage = pageNumber;
    let pagesCount = totalUsers / usersPerPage;
    if (currentPage > pagesCount + 1) {
        history.push('/1');
    }
    for (let i = 1; i <= Math.ceil(pagesCount); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.pagination__container}>
                {pageNumbers.map(number => (
                    <li className={style.pagination__item} key={number}>
                        <NavLink to={`/${number}`}
                                 onClick={() => history.push('/' + number)}
                                 className={style.pagination__link}
                                 activeClassName={style.active}>
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;