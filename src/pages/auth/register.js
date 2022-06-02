import React from "react";

import { Link } from "react-router-dom";

import MyButton from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import Phone from "../../components/phone";

import "./login.scss";


const Register = () => {
    return (
        <>
            <div className="article__left">
                <Phone />
            </div>

            <div className="article__right">
                <div>
                    <div className="form">
                        <Logo className="logo-login" />
                        <form className="form__input">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="my-input"
                                id="username" />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="my-input"
                                id="password" />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="my-input"
                                id="email" />
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="my-input"
                                id="phone" />
                            <MyButton
                                id="submit"
                                className="my-button"
                                type="submit"
                                children="Sign In" />
                        </form>
                    </div>
                </div>
                <div className="form__footer">
                    <div className="">
                        <span>Have an account?</span>
                        <Link to="/accounts/login">Log In</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;