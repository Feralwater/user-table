import React from 'react';
import {useDispatch} from "react-redux";
import {setChosenUserId} from "../../reducers/usersReducer";

const UserRow = ({user}) => {
    const dispatch = useDispatch();
    const showUserInfo = (e) => {
        dispatch(setChosenUserId(e.currentTarget.id))
    }

    return (
        <tr onClick={showUserInfo} id={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.adress.state}</td>
        </tr>
    );
};

export default UserRow;