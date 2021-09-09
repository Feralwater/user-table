import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setFilteredUsers} from "../../reducers/usersReducer";
import style from "./Filter.module.scss"

const Filter = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const [selectState, setSelectState] = useState('');
    return (
        <select className={style.filter}
            value={selectState} onChange={(e) => {
            dispatch(setFilteredUsers(users, e.currentTarget.value));
            setSelectState(e.currentTarget.value);
        }}>
            <option value="">Filter by state</option>
            <option value="PA">PA</option>
            <option value="DC">DC</option>
            <option value="WY">WY</option>
            <option value="CT">CT</option>
            <option value="MS">MS</option>
            <option value="VT">VT</option>
            <option value="MN">MN</option>
            <option value="NM">NM</option>
            <option value="CO">CO</option>
            <option value="GA">GA</option>
            <option value="DC">DC</option>
            <option value="VA">VA</option>
            <option value="IN">IN</option>
            <option value="FL">FL</option>
            <option value="DE">DE</option>
            <option value="ME">ME</option>
            <option value="AZ">AZ</option>
            <option value="LA">LA</option>
            <option value="HI">HI</option>
            <option value="CT">CT</option>
        </select>
    );
};

export default Filter;