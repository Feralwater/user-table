import axios from "axios";
import {setUsers, setUsersForFilter} from "../reducers/usersReducer";

export const getUsers = () => {
    return async (dispatch) => {
        const response = await axios.get(
            'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
        )
        const users = response.data.map((item) => {
            return {...item, state: item.adress.state}
        });
        dispatch(setUsers([...users]));
        dispatch(setUsersForFilter([...users]));
    }
}