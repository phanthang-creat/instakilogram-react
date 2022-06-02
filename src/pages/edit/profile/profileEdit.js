import React from "react";
import requestAPI from "../../../controller/API/requestAPI";

import "./profileEdit.scss";

const ProfileEdit = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [userData] = React.useState(user);

    const submitForm = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("name", document.getElementById("name").value);
        form.append("email", document.getElementById("email").value);
        form.append("phone", document.getElementById("phone").value);
        form.append("age", document.getElementById("age").value);
        if (document.getElementById("avt-upload").files.length > 0) {
            form.append("avatar", document.getElementById("avt-upload").files[0]);
        } else {
            form.append("avatar", "");
        }
        let data = requestAPI(`/api/user/update/${user.id}`, form, "POST",);
        setTimeout(() => {
            data.then(res => {
                if (res.avatar) {
                    let newUser = { ...user };
                    if (res.phone) {
                        newUser.phone = res.phone;
                    }
                    if (res.name) {
                        newUser.name = res.name;
                    }
                    if (res.email) {
                        newUser.email = res.email;
                    }
                    if (res.age) {
                        newUser.age = res.age;
                    }
                    if (res.avatar !== user.avatar) {
                        newUser.avatar = res.avatar;
                    }
                    localStorage.setItem("user", JSON.stringify(newUser));
                    window.location.reload();
                }
            })
        }, 1000);

    }
    const formImageOnChange = (e) => {
        const formImageHandle = document.querySelector("#avatar-img");
        const [file] = e.target.files;
        if (file) {
            formImageHandle.src = URL.createObjectURL(file);
        }
    };

    return (
        <div className="profile-edit">
            <div className="edit-avatar my-form">
                <div className="edit-avatar__img left">
                    <img
                        src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${userData.avatar}`}
                        alt="avatar"
                        id="avatar-img"
                    />
                </div>
                <div className="edit-avatar__img right">
                    <div className="">
                        <h2 className="username">{userData.username}</h2>
                        <label
                            htmlFor="avt-upload"
                            className="edit-avatar__img__label change-photo"
                        >
                            Change Profile Photo
                        </label>
                        <input
                            onChange={formImageOnChange}
                            id="avt-upload"
                            className="upload-file"
                            type="file"
                            name="avatar"
                        />
                    </div>
                </div>
            </div>
            <div className="my-form">
                <div className="left">
                    <span>Name</span>
                </div>
                <div className="right">
                    <div className="input-group">
                        <input
                            type="text"
                            id="name"
                            className="input"
                            placeholder="Name"
                            defaultValue={userData.name}
                        />
                    </div>
                </div>
            </div>
            <div className="my-form">
                <div className="left">
                    <span>Username</span>
                </div>
                <div className="right">
                    <div className="input-group">
                        <input
                            type="text"
                            disabled
                            className="input"
                            placeholder="Username"
                            defaultValue={userData.username}
                        />
                    </div>
                </div>
            </div>
            <div className="my-form">
                <div className="left">
                    <span>Email</span>
                </div>
                <div className="right">
                    <div className="input-group">
                        <input
                            id="email"
                            type="text"
                            className="input"
                            placeholder="Email"
                            defaultValue={userData.email}
                        />
                    </div>
                </div>
            </div>
            <div className="edit-avatar my-form">
                <div className="left">
                    <span>Phone Number</span>
                </div>
                <div className="right">
                    <div className="input-group">
                        <input
                            id="phone"
                            type="text"
                            className="input"
                            placeholder="Phone Number"
                            defaultValue={userData.phone}
                        />
                    </div>
                </div>
            </div>
            <div className="edit-avatar my-form">
                <div className="left">
                    <span>Age</span>
                </div>
                <div className="right">
                    <div className="input-group">
                        <input
                            id="age"
                            type="text"
                            className="input"
                            placeholder="Age"
                            defaultValue={userData.age !== "-1" ? user.age : ""}
                        />
                    </div>
                </div>
            </div>
            <div className="my-form">
                <div className="left"></div>
                <div className="right">
                    <div className="">
                        <button
                            onClick={submitForm}
                            className="my-btn"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
