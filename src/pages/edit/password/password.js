import React from "react";
import requestAPI from "../../../controller/API/requestAPI";

import "../profile/profileEdit.scss";

const Password = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const changePassword = (e) => {
        e.preventDefault();
        let oldPassword = document.getElementById("old-password").value;
        let newPassword = document.getElementById("new-password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        if (newPassword === "" || confirmPassword === "" || oldPassword === "") {
            alert("Please fill in all fields");
            return;
        }
        if (newPassword === confirmPassword) {
            let form = new FormData();
            form.append("newPassword", newPassword);
            form.append("oldPassword", oldPassword);
            const data = requestAPI(`/api/user/change_pass/${user.id}`, form, "POST");
            setTimeout(() => {
                data.then(res => {
                    if (res === "success") {
                        alert("Password changed successfully");
                    } else {
                        alert("Password change failed");
                    }
                })
            }, 1000);
        } else {
            alert("Passwords do not match");
        }

    }

    return (
        <div className="profile-edit">
            <form>
                <div className="my-form">
                    <div className="left">
                        <span>Old Password</span>
                    </div>
                    <div className="right">
                        <div className="input-group">
                            <input
                                type="password"
                                id="old-password"
                                className="input"
                                placeholder="Old Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="my-form">
                    <div className="left">
                        <span>New Password</span>
                    </div>
                    <div className="right">
                        <div className="input-group">
                            <input
                                type="password"
                                id="new-password"
                                className="input"
                                placeholder="New Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="my-form">
                    <div className="left">
                        <span>Confirm New Password</span>
                    </div>
                    <div className="right">
                        <div className="input-group">
                            <input
                                type="password"
                                id="confirm-password"
                                className="input"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="my-form">
                    <div className="left">
                        <span>&nbsp;</span>
                    </div>
                    <div className="right">
                        <div className="input-group">
                            <button className="btn btn-primary" onClick={changePassword}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Password;