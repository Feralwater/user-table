const SET_USERS = "SET_USERS"
const SET_CHOSEN_USER = "SET_CHOSEN_USER"
const SET_USERS_FOR_FILTER = "SET_USERS_FOR_FILTER"
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"
const SET_SELECT_VALUE = "SET_SELECT_VALUE"

const defaultState = {
    users: [],
    usersForFilter: [],
    chosenUserId: "",
    searchValue: "",
    selectValue: "",
}

export default function usersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case SET_USERS_FOR_FILTER:
            return {
                ...state,
                usersForFilter: action.payload,
            }
        case SET_CHOSEN_USER:
            return {
                ...state,
                chosenUserId: action.payload
            }
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload
            }
        case SET_SELECT_VALUE:
            return {
                ...state,
                selectValue: action.payload
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, payload: users});
export const setSearchValue = (searchValue) => ({type: SET_SEARCH_VALUE, payload: searchValue});
export const setSelectValue = (selectValue) => ({type: SET_SELECT_VALUE, payload: selectValue});
export const setUsersForFilter = (users) => ({type: SET_USERS_FOR_FILTER, payload: users});
export const setChosenUserId = (userId) => ({type: SET_CHOSEN_USER, payload: userId});