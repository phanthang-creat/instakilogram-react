import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./edit.scss";
import Password from "./password/password";
import ProfileEdit from "./profile/profileEdit";

const Edit = () => {

    const [linkActive, setLinkActive] = React.useState("");

    const linkList = [
        { path: "", name: "Profile" },
        { path: "password", name: "Password" },
        { path: "email", name: "Email Notifications" },
        { path: "blocked", name: "Blocked Users" },
        { path: "help", name: "Help" },
    ]

    const changeTab = (e) => {
        console.log("changeTab", e.target.getAttribute("tab"));
        let tab = e.target.getAttribute("tab");
        setLinkActive(tab);
    }

    React.useEffect(() => {
        let path = window.location.pathname.split("/")[3] || "";
        console.log("Edit useEffect", path);
        switch (path) {
            case "password":
                setLinkActive("Password");
                break;
            case "email":
                setLinkActive("Email Notifications");
                break;
            case "blocked":
                setLinkActive("Blocked Users");
                break;
            case "help":
                setLinkActive("Help");
                break;
            default:
                setLinkActive("Profile");
                break;
        }
    }, [])

    return (
        <div className="edit">
            <div className="sidebar">
                {linkList.map((link, index) => {
                    return (
                        <Link
                        tab={link.name}
                        onClick={changeTab}
                        to={link.path} 
                        key={index} 
                        className={`sidebar__item__link sidebar__item${linkActive === link.name ? " active" : ""}`}
                        >
                            <div className="" tab={link.name}>
                                {link.name}
                            </div>
                        </Link>
                    )})
                }
            </div>
            <div className="information">
                <Routes>
                    <Route path="/" element={<ProfileEdit />} />
                    <Route path="/password" element={<Password />} />
                    <Route path="/email" element={<h1>Email Notifications</h1>} />
                    <Route path="/blocked" element={<h1>Blocked Users</h1>} />
                    <Route path="/help" element={<h1>Help</h1>} />
                </Routes>
            </div>
        </div>
    )
}

export default Edit;