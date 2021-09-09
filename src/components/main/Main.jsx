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
    const filteredUsers = useSelector(state => state.users.filteredUsers);
    const chosenUserId = useSelector(state => state.users.chosenUserId);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [activeModal, setActiveModal] = useState(false)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const findUserInfo = (userId) => users.find(u => u.id === +userId);
    const userInfo = findUserInfo(chosenUserId);
    console.log(userInfo)
    const searchHandler = () => [...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
    let usersForRender = searchHandler();
    const onKeyDown = e => {
        if (e.key === "Enter") {
            usersForRender = [...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
        }
    }
    const [sortName, setSortName] = useState('');
    const [direction, setDirection] = useState(-1);

    const sortHandler = (sortField) => {
        const currentDirection = (sortName === sortField) ? -direction : -1;
        usersForRender = [...users].sort((a, b) => a[sortField] > b[sortField] ? -currentDirection : currentDirection);
        dispatch(setUsers(usersForRender));
        setDirection(currentDirection);
        setSortName(sortField);
    }
    return (
        <>
            <div className={style.filters__container}>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} onKeyDown={onKeyDown}/>
                <Filter/>
            </div>
            <table className={style.table}>
                <thead>
                <tr>
                    <th onClick={() => {
                        sortHandler("id");
                    }}>id
                    </th>
                    <th onClick={() => {
                        sortHandler("firstName");
                    }}>First name
                    </th>
                    <th onClick={() => {
                        sortHandler("lastName");
                    }}>Last name
                    </th>
                    <th onClick={() => {
                        sortHandler("email");
                    }}>Email
                    </th>
                    <th onClick={() => {
                        sortHandler("phone");
                    }}>Phone
                    </th>
                    <th onClick={() => {
                        sortHandler("state");
                    }}>State
                    </th>
                </tr>
                </thead>
                <tbody>
                {usersForRender.length > 0 ?
                    usersForRender.map(u => <UserRow user={u} key={u.id + u.email} setActiveModal={setActiveModal}/>)
                    : filteredUsers.length > 0 ? filteredUsers.map(u => <UserRow user={u} key={u.id + u.email}
                                                                                 setActiveModal={setActiveModal}/>)
                        : currentUsers.map(u => <UserRow user={u} key={u.id + u.email}
                                                         setActiveModal={setActiveModal}/>)}
                </tbody>
            </table>
            <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>
            <UserInfo user={userInfo} activeModal={activeModal} setActiveModal={setActiveModal}/>
        </>
    );
};

export default Main;