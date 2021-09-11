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


const Main = ({match}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const usersForFilter = useSelector(state => state.users.usersForFilter);
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

    let filterFunction = (user) => {
        const columnNames = ['firstName', 'lastName', 'email', 'phone'];
        return columnNames.some((columnName) => user[columnName].toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase()))
    };

    const searchHandler = () => {
        let filtered = [...usersForFilter].filter(filterFunction);
        dispatch(setUsers(filtered));
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
        setToggleClass(!toggleClass);
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
                        <Table sortHandler={sortHandler}
                               toggleClass={toggleClass}
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
                            paginate={paginate}
                            match={match}
                        />
                    </div>
                </div>
            </div>
            <UserInfo user={userInfo} activeModal={activeModal} setActiveModal={setActiveModal}/>
        </>
    );
};

export default Main;