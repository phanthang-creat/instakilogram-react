import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../404/404";
import Login from "./login";
import Register from "./register";

import "./login.scss";

const Auth = () => {

    return (
        <div className="login">
            <main>
                <div className="article">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}


export default Auth;