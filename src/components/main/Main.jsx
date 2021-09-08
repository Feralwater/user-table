import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/users";
import UserRow from "../userRow/UserRow";
import UserInfo from "../userInfo/userInfo";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)
    const chosenUserId = useSelector(state => state.users.chosenUserId)
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const findUserInfo = (userId) => {
        return users.find(u => +u.id === +userId);
    }
    const userInfo = findUserInfo(chosenUserId)
    return (
        <div>
            <table border="1">
                <tr>
                    <th>id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                </tr>
                {users.map(u => <UserRow user={u}/>)}
            </table>
            <UserInfo user={userInfo}/>
        </div>
    );
};

export default Main;