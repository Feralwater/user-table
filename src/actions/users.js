import axios from "axios";
import {setUsers, setUsersForFilter} from "../reducers/usersReducer";

export const getUsers = () => {
    return async (dispatch) => {
        const response = await axios.get(
        'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
        )
        let users = response.data;
        dispatch(setUsers([...users]));
        dispatch(setUsersForFilter([...users]));
    }
}