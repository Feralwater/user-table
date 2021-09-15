import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserInfo from "../userInfo/UserInfo";
import {setUsers} from "../../reducers/usersReducer";
import Filter from "../filter/Filter";
import Pagination from "../pagination/Pagination";
import style from "./Main.module.scss"
import SearchInput from "../searchInput/SearchInput";
import Table from "../table/Table";
import {useParams} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const usersForFilter = useSelector(state => state.users.usersForFilter);
    const chosenUserId = useSelector(state => state.users.chosenUserId);
    const searchValue = useSelector(state => state.users.searchValue);
    const selectValue = useSelector(state => state.users.selectValue);
    const [activeModal, setActiveModal] = useState(false)
    const [sortName, setSortName] = useState('');
    const [direction, setDirection] = useState(-1);
    const [usersPerPage] = useState(20);
    const {number} = useParams();
    const indexOfLastUser = number * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        filterBySearchAndState()
    }, [dispatch, searchValue, selectValue, number, direction, sortName])

    const findUserInfo = (userId) => users.find(u => u.id === +userId);
    const userInfo = findUserInfo(chosenUserId);

    function filterBySearch(user) {
        const columnNames = ['firstName', 'lastName', 'email', 'phone'];
        return columnNames.some((columnName) =>
            user[columnName].toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase()))
    }

    const sortHandler = (sortField) => {
        const currentDirection = (sortName === sortField) ? -direction : -1;
        setDirection(currentDirection);
        setSortName(sortField);
    }

    function filterByState(user) {
        return user.adress.state.includes(selectValue)
    }

    const filterBySearchAndState = () => {
        const filtered = [...usersForFilter].filter(filterBySearch).filter(filterByState);
        const sorted = filtered.sort((a, b) => a[sortName] > b[sortName] ? -direction : direction)
        dispatch(setUsers(sorted));
    }

    return (<>
            <div className={style.container}>
                <div className={style.filters__container}>
                    <SearchInput/>
                    <Filter filterBySearchAndState={filterBySearchAndState}/>
                </div>
                <div className={style.table__container}>
                    <div>
                        <Table sortHandler={sortHandler}
                               currentUsers={currentUsers}
                               setActiveModal={setActiveModal}
                               sortName={sortName}
                               direction={direction}
                        />
                    </div>
                    <div>
                        <Pagination
                            usersPerPage={usersPerPage}
                            totalUsers={users.length}
                            pageNumber={number}
                        />
                    </div>
                </div>
            </div>
            <UserInfo user={userInfo} activeModal={activeModal} setActiveModal={setActiveModal}/>
        </>
    );
};

export default Main;