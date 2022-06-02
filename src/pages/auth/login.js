import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../../components/input";
import Logo from "../../components/logo";
import Phone from "../../components/phone";
import { login } from "../../redux/reducer/auth.reducer";

import "./login.scss";

const Login = () => {

    const dispatch = useDispatch();

    const [spin, setSpin] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        setSpin(true);
        let data = new FormData();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        if (username === "" || password === "") {
            alert("Please fill all fields");
            setSpin(false);
            return;
        }

        data.append("username", username);
        data.append("password", password);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                const { token, refresh_token, message, user } = data;
                if (message === "login success") {
                    setSuccess(true);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                    localStorage.setItem("auth", true);
                    localStorage.setItem("refresh_token", refresh_token);
                    dispatch(login(true, token));
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else {
                    setErr(data);
                }
                setSpin(false);
            }).then(() => {
                setSpin(false);
            })
    }

    React.useEffect(() => {
        console.log("Login");
    }, []);

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
                            <button
                                id="login-btn"
                                className={`button my-button`}
                                onClick={onClick}
                                type="button"
                                disabled={false}
                            >
                                {spin && <Spinner
                                    style={{ marginRight: "10px" }}
                                    variant="secondary"
                                    animation="border"
                                    as="span"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                <span>Login</span>
                            </button>
                        </form>
                        {err &&
                            <div className="err">
                                <span>{err}</span>
                            </div>
                        }
                        {success &&
                            <div className="success">
                                <span>Login success</span>
                            </div>
                        }
                        <a
                            className="forgot-password"
                            href="/accounts/password/reset"
                        >
                            <span>Forgot password?</span>
                        </a>
                    </div>
                </div>
                <div className="form__footer">
                    <div className="">
                        <span>Don't have an account?</span>
                        <Link to="/accounts/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;