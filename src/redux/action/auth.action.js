const Login = (payload) => {
    return {
        type: "SET_CURRENT_USER",
        payload
    }
}

const Logout = () => {
    return {
        type: "LOGOUT"
    }
}