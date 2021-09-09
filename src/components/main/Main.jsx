import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserRow from "../userRow/UserRow";
import UserInfo from "../userInfo/userInfo";
import {setUsers} from "../../reducers/usersReducer";
import Filter from "../filter/Filter";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const filteredUsers = useSelector(state => state.users.filteredUsers);
    const chosenUserId = useSelector(state => state.users.chosenUserId);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const findUserInfo = (userId) => users.find(u => +u.id === +userId);
    const userInfo = findUserInfo(chosenUserId);
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
        <div>
            <div>
                <input
                    value={searchValue}
                    type="text"
                    placeholder={"Search by name:"}
                    onChange={(e) => {
                        setSearchValue(e.currentTarget.value)
                    }}
                    onKeyDown={onKeyDown}
                />
                <button onClick={() => searchHandler()}>Search</button>
            </div>
            <Filter/>
            <table border="1">
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
                    usersForRender.map(u => <UserRow user={u} key={u.id + u.email}/>)
                    : filteredUsers.length > 0 ? filteredUsers.map(u => <UserRow user={u} key={u.id + u.email}/>)
                        : users.map(u => <UserRow user={u} key={u.id + u.email}/>)}
                </tbody>
            </table>
            <UserInfo user={userInfo}/>
        </div>
    );
};

export default Main;