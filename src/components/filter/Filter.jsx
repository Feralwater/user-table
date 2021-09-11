import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectValue} from "../../reducers/usersReducer";
import style from "./Filter.module.scss"

function OnChange(usersForFilter, dispatch, filterBySearchAndState) {
    return (e) => {
        const selectValue = e.currentTarget.value
        dispatch(setSelectValue(selectValue))
        filterBySearchAndState({selectValue})
    };
}

const Filter = ({filterBySearchAndState}) => {
    const dispatch = useDispatch();
    const selectValue = useSelector(state => state.users.selectValue);
    const usersForFilter = useSelector(state => state.users.usersForFilter);
    const states = Array.from(new Set(usersForFilter.map(u=>u.adress.state)))

    return (
        <select className={style.filter}
                value={selectValue}
                onChange={OnChange(usersForFilter, dispatch, filterBySearchAndState)}>
            <option value="">Filter by state</option>
            {states.map(s => <option value={s} key={s}>{s}</option>)}
        </select>
    );
};

export default Filter;