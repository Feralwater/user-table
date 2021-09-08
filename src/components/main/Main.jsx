import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserRow from "../userRow/UserRow";
import UserInfo from "../userInfo/userInfo";
import {setUsers} from "../../reducers/usersReducer";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const chosenUserId = useSelector(state => state.users.chosenUserId);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const findUserInfo = (userId) => users.find(u => +u.id === +userId);
    const userInfo = findUserInfo(chosenUserId);
    const searchHandler = () => [...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
    let usersForRender = searchHandler();
    const onKeyDown = e => {
        if (e.key === "Enter") {
            usersForRender =[...users].filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
        }
    }
    const [sortName, setSortName] = useState('');
    const [direction, setDirection] = useState(-1);

    const sortHandler = (sortField) => {
        setSortName(sortField);
        const currentDirection = (sortName === sortField)? -direction :  -1;
        setDirection(currentDirection);
        usersForRender = [...users].sort((a, b) => a[sortField] > b[sortField] ? -currentDirection : currentDirection);
        dispatch(setUsers(usersForRender));
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
            <table border="1">
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
                        sortHandler("lastName")
                    }}>Last name
                    </th>
                    <th onClick={() => {
                        sortHandler("email")
                    }}>Email
                    </th>
                    <th onClick={() => {
                        sortHandler("phone")
                    }}>Phone
                    </th>
                    <th onClick={() => {
                        sortHandler("state")
                    }}>State
                    </th>
                </tr>
                {usersForRender.length > 0 ? usersForRender.map(u => <UserRow user={u}/>) : users.map(u => <UserRow
                    user={u}/>)}
            </table>
            <UserInfo user={userInfo}/>
        </div>
    );
};

export default Main;