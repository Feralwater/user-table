const SET_USERS = "SET_USERS"
const SET_CHOSEN_USER = "SET_CHOSEN_USER"
const FILTER_BY_STATE = "FILTER_BY_STATE"

const defaultState = {
    users: [],
    chosenUserId: "",
    filteredUsers: [],
}

export default function usersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_CHOSEN_USER:
            return {
                ...state,
                chosenUserId: action.payload
            }
        case FILTER_BY_STATE:
            return {
                ...state,
                filteredUsers: action.payload.users
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, payload: users});
export const setChosenUserId = (userId) => ({type: SET_CHOSEN_USER, payload: userId});
export const setFilteredUsers = (users, state) => ({
    type: FILTER_BY_STATE, payload: {users: state === "" ? users : users.filter(u => u.adress.state === state)}
});