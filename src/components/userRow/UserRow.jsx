import React from 'react';
import {useDispatch} from "react-redux";
import {setChosenUserId} from "../../reducers/usersReducer";
import style from "./UserRow.module.scss"

const UserRow = ({user, setActiveModal}) => {
    const dispatch = useDispatch();

    return (
        <tr onClick={(e) => {
            dispatch(setChosenUserId(e.currentTarget.id));
            setActiveModal(true);
        }} id={user.id} className={style.row}>
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