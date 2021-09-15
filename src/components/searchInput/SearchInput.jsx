import React from "react";
import style from "./SearchInput.module.scss"
import {setSearchValue} from "../../reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";

const SearchInput = ({onKeyPress}) => {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.users.searchValue);
    return (<input
        className={style.input}
        value={searchValue}
        type="text"
        placeholder={"Enter a search value"}
        onChange={(e) => {
            dispatch(setSearchValue(e.currentTarget.value));
        }}
        onKeyPress={onKeyPress}
    />);
}
export default SearchInput;