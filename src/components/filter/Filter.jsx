import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../../reducers/usersReducer";
import style from "./Filter.module.scss"

function OnChange(usersForFilter, dispatch, setSelectState) {
    return (e) => {
        const searchValue = e.currentTarget.value
        const filterFunction = (user) => {
            return user.adress.state.includes(searchValue)
        };
        const filtered = [...usersForFilter].filter(filterFunction);
        dispatch(setUsers(filtered));
        setSelectState(searchValue)
    };
}

const Filter = () => {
    const dispatch = useDispatch();
    const [selectState, setSelectState] = useState('');
    const usersForFilter = useSelector(state => state.users.usersForFilter);
    return (
        <select className={style.filter}
                value={selectState}
                onChange={OnChange(usersForFilter, dispatch, setSelectState)}>
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
            <option value="TX">TX</option>
        </select>
    );
};

export default Filter;