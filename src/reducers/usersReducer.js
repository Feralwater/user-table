const defaultState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adress: {
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
    },
    description: "",
    sort: ""
}

export default function usersReducer(state = defaultState, action) {
    switch (action.type) {

        default:
            return state
    }
}