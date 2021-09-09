import axios from "axios";
import {setUsers} from "../reducers/usersReducer";

export const getUsers = () => {
    return async (dispatch) => {
        const response = await axios.get(
            `http://www.filltext.com/?rows=132&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32`
        )
        dispatch(setUsers(response.data))
    }
}