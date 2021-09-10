import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserRow from "../userRow/UserRow";
import UserInfo from "../userInfo/UserInfo";
import {setUsers} from "../../reducers/usersReducer";
import Filter from "../filter/Filter";
import Pagination from "../pagination/Pagination";
import style from "./Main.module.scss"
import SearchInput from "../searchInput/SearchInput";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const chosenUserId = useSelector(state => state.users.chosenUserId);
    const [searchValue, setSearchValue] = useState("");
    const [activeModal, setActiveModal] = useState(false)
    const [sortName, setSortName] = useState('');
    const [direction, setDirection] = useState(-1);
    const [toggleClass, setToggleClass] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const findUserInfo = (userId) => users.find(u => u.id === +userId);
    const userInfo = findUserInfo(chosenUserId);

    const searchHandler = () => {
        searchValue === ""
        || [...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase()).length === 0 ?
            dispatch(getUsers())
            : dispatch(setUsers(
                [...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
            ));
    }
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            searchHandler();
        }
    }

    const sortHandler = (sortField) => {
        const currentDirection = (sortName === sortField) ? -direction : -1;
        dispatch(setUsers(
            [...users].sort((a, b) => a[sortField] > b[sortField] ? -currentDirection : currentDirection)
        ));
        setDirection(currentDirection);
        setSortName(sortField);
    }

    return (<>
            <div className={style.container}>
                <div className={style.filters__container}>
                    <SearchInput
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onKeyPress={onKeyPress}
                        searchHandler={searchHandler}
                    />
                    <Filter/>
                </div>
                <div className={style.table__container}>
                    <div>
                        <table className={style.table}>
                            <thead>
                            <tr>
                                <th onClick={() => {
                                    sortHandler("id");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >id
                                </th>
                                <th onClick={() => {
                                    sortHandler("firstName");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >First name
                                </th>
                                <th onClick={() => {
                                    sortHandler("lastName");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >Last name
                                </th>
                                <th onClick={() => {
                                    sortHandler("email");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >Email
                                </th>
                                <th onClick={() => {
                                    sortHandler("phone");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >Phone
                                </th>
                                <th onClick={() => {
                                    sortHandler("state");
                                    setToggleClass(!toggleClass);
                                }}
                                    className={toggleClass ? style.toggle : ''}
                                >State
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map(u => <UserRow user={u} key={u.id + u.email}
                                                            setActiveModal={setActiveModal}/>)}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>
                    </div>
                </div>
            </div>
            <UserInfo user={userInfo} activeModal={activeModal} setActiveModal={setActiveModal}/>
        </>
    );
};

export default Main;