import React from "react";
import style from "./SearchInput.module.scss"

const SearchInput = ({searchValue, setSearchValue, onKeyDown}) => {
    return (<input
        className={style.input}
        value={searchValue}
        type="text"
        placeholder={"Search by name:"}
        onChange={(e) => {
            setSearchValue(e.currentTarget.value);
        }}
        onKeyDown={onKeyDown}
    />);
}
export default SearchInput;