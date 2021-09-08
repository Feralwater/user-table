import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserRow from "../userRow/UserRow";
import UserInfo from "../userInfo/userInfo";

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
    const searchHandler = () => users.filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
    let usersForRender = searchHandler();
    const onKeyDown = e => {
        if (e.key === "Enter") {
            usersForRender = users.filter(u => u.firstName.toLocaleLowerCase() === searchValue.trim().toLocaleLowerCase())
        }
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
                    <th>id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                </tr>
                {usersForRender.length > 0 ? usersForRender.map(u => <UserRow user={u}/>) : users.map(u => <UserRow
                    user={u}/>)}
            </table>
            <UserInfo user={userInfo}/>
        </div>
    );
};

export default Main;