import React, {  } from "react";
// import { useDispatch } from "react-redux";

import Login from "../pages/auth/auth";
import Home from "../pages/home/home";
// import { login } from "../redux/reducer/auth.reducer";

const Route = () => {
    // const auth = useSelector(state => state.auth);
    const auth = localStorage.getItem("auth");

    return (
        <div>
            {auth ? <Home /> : <Login />}
        </div>
    )
}

export default Route;