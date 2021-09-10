import React from "react";
import style from "./SearchInput.module.scss"

const SearchInput = ({searchValue, setSearchValue, onKeyPress}) => {
    return (<input
        className={style.input}
        value={searchValue}
        type="text"
        placeholder={"Enter a search value and press Enter"}
        onChange={(e) => {
            setSearchValue(e.currentTarget.value);
        }}
        onKeyPress={onKeyPress}
    />);
}
export default SearchInput;