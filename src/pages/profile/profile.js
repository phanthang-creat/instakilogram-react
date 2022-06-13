import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import requestAPI from "../../controller/API/requestAPI";
import { setProfile } from "../../redux/reducer/profile.reducer";
import Default from "./post/defaul.post";
import Post from "./post/post";

import "./profile.scss";

const Profile = () => {
    // window.location.reload();

    const dispatch = useDispatch();

    const listLink = [
        {
            name: "Post",
            path: "",
        },
        {
            name: "Saved",
            path: "saved",
        },
        {
            name: "Tagged",
            path: "tagged",
        },
    ];

    // const [activeTab, setActiveTab] = React.useState("");
    const [modal, setModal] = React.useState(false);

    const [user, setUser] = React.useState({
        age: "",
        email: "",
        id: "",
        name: "",
        username: "",
        phone: "",
        avatar: "",
        isOwner: false,
        isFollowing: false,
    });

    const path = useSelector((state) => state.path.path);

    //when click button follow
    const followHandler = (e) => {
        e.preventDefault();
        let data = requestAPI(`/api/user/follow/${user.id}`, {}, "POST");
        setTimeout(() => {
            data.then((res) => {
                if (res === "success") {
                    setUser({
                        ...user,
                        isFollowing: true,
                    });
                } else {
                    alert("Follow failed");
                }
            });
        }, 500);
    }


    const unFollowHandler = (e) => {
        e.preventDefault();
        let data = requestAPI(`/api/user/un-follow/${user.id}`, {}, "POST");
        setTimeout(() => {
            data.then((res) => {
                if (res === "success") {
                    setUser({
                        ...user,
                        isFollowing: false,
                    });
                } else {
                    alert("Unfollow failed");
                }
            });
            setModal(false);
        }, 500);
    }




    useEffect(() => {

        let uid = window.location.pathname.split("/")[1];
        let timer1 = null;
        let user = requestAPI(`/api/user/${uid}`);
        let following = requestAPI(`/api/user/following/${uid}`);
        timer1 = setTimeout(() => {
            user.then((res) => {
                let action = setProfile(res[0]);
                dispatch(action);
                setUser(res[0]);
            });
            following.then((res) => {
            });
        }, 700);
        return () => {
            clearTimeout(timer1);
        };
    }, [path, dispatch]);

    return (
        <div className="profile">
            {user.username === "" && (
                <div className="my-spinner">
                    <Spinner animation="border" />
                </div>
            )}
            {user.username !== "" && (
                <>
                    <header className="header">
                        <div className="header__avatar">
                            <div className="avatar">
                                <img
                                    src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${user.avatar}`}
                                    alt="avatar"
                                />
                            </div>
                        </div>
                        <div className="information">
                            <div className="info row1">
                                <h2 className="name">{user.username}</h2>
                                <div className="btn-edit">
                                    {user.isOwner ? (
                                        <Link to="/account/edits" className="btn-edit__item">
                                            Edit Profile
                                        </Link>
                                    ) : user.isFollowing ? (
                                        <>
                                            <button className="btn-edit__item" onClick={() => setModal(true)}>
                                                <svg
                                                    aria-label="Following"
                                                    className="_ab6-"
                                                    color="#262626"
                                                    fill="#262626"
                                                    height="15"
                                                    role="img"
                                                    viewBox="0 0 95.28 70.03"
                                                    width="20"
                                                >
                                                    <path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path>
                                                </svg>
                                            </button>
                                            {modal && (
                                            <div className="access-un-follow">
                                                <div className="my-modal" onClick={() => setModal(false)}></div>
                                                <div>
                                                    <div className="modal-content">
                                                        <div className="modal-content-form">
                                                            <div className="modal-avatar">
                                                                <img src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${user.avatar}`} alt="avatar" />
                                                            </div>
                                                            <div className="row-1">
                                                                <p>{`Unfollow @${user.username}?`}</p>
                                                            </div>
                                                            <div className="row-2">
                                                                <button onClick={unFollowHandler}>
                                                                    Unfollow
                                                                </button>
                                                            </div>
                                                            <div className="row-3">
                                                                <button onClick={() => setModal(false)}>Cancel</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                        </>
                                    ) : (
                                        <button className="btn-edit__item" onClick={followHandler}>Follow</button>
                                    )}
                                </div>
                                <div className="btn-setting">
                                    <svg
                                        aria-label="Options"
                                        color="#262626"
                                        fill="#262626"
                                        height="24"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            fill="none"
                                            r="8.635"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></circle>
                                        <path
                                            d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="info row2">
                                <span className="item">
                                    <b>0</b> post
                                </span>
                                <span className="item">
                                    <b>0</b> follower
                                </span>
                                <span className="item">
                                    <b>0</b> following
                                </span>
                            </div>
                            <div className="info row3">
                                <span>{user.username}</span>
                                <br></br>
                            </div>
                        </div>
                    </header>
                    <div className="sharing">
                        <div className="sharing__link">
                            {listLink.map((item, index) => {
                                return (
                                    <div
                                        className={`link${item.path === path ? " active" : ""}`}
                                        key={index}
                                    >
                                        <Link to={item.path} tab={item.name}>
                                            {item.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <Routes>
                            <Route path="/" element={<Post />} />
                            <Route path="/saved" element={<Default />} />
                            <Route path="/tagged" element={<Default />} />
                        </Routes>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
