import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import style from "./Pagination.module.scss"

const Pagination = ({usersPerPage, totalUsers, paginate, match}) => {
    const pageNumbers = [];
    const history = useHistory();
    const currentPage = match.params.number || 1;
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
                                 onClick={() => paginate(number)}
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