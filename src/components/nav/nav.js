import React, {  } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NewPost from "../../pages/newPost/newPost";
import { newPost } from "../../redux/reducer/newPost.reducer";
import Logo from "../logo";
import "./myNav.scss";
import Search from "./search";

const MyNav = () => {
    const [dropDownActive, setDropDownActive] = React.useState(false);

    // const newPostHandler = useSelector((state) => state.newPost);

    const dispatch = useDispatch();

    // console.log(newPostHandler);

    const newPostHandler = () => {
        const action = newPost({ status: true });
        dispatch(action);
    }

    const toggleDropDown = () => {
        setDropDownActive(!dropDownActive);
    };
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <nav>
            <Container fluid="fluid">
                <div className="my-nav">
                    <Link to="/" className="my-nav__logo" >
                        <Logo />
                    </Link>
                    <Search />
                    <div className="my-nav__icons">
                        <div className="my-icon">
                            <Link to="/">
                                <svg
                                    aria-label="Home"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                                </svg>
                            </Link>
                        </div>
                        <div className="my-icon">
                            <Link to="/direct/inbox">
                                <svg
                                    aria-label="Messenger"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path
                                        d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                        strokeWidth="1.739"
                                    ></path>
                                    <path
                                        d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </Link>
                        </div>
                        <div className="my-icon">
                            <button onClick={newPostHandler}>
                                <svg
                                    aria-label="New Post"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path
                                        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></path>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="6.545"
                                        x2="17.455"
                                        y1="12.001"
                                        y2="12.001"
                                    ></line>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="12.003"
                                        x2="12.003"
                                        y1="6.545"
                                        y2="17.455"
                                    ></line>
                                </svg>
                            </button>
                        </div>
                        <div className="my-icon">
                            <Link to="/explore">
                                <svg
                                    aria-label="Find People"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <polygon
                                        fill="none"
                                        points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></polygon>
                                    <polygon
                                        fillRule="evenodd"
                                        points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                                    ></polygon>
                                    <circle
                                        cx="12.001"
                                        cy="12.005"
                                        fill="none"
                                        r="10.5"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></circle>
                                </svg>
                            </Link>
                        </div>
                        <div className="my-icon">
                            <Link to="/">
                                <svg
                                    aria-label="Activity Feed"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                                </svg>
                            </Link>
                        </div>
                        <div className="my-icon avatar">
                            <img
                                onClick={toggleDropDown}
                                src={
                                    process.env.REACT_APP_SERVER_URL +
                                    "/static/image/avt/" +
                                    user.avatar
                                }
                                alt="avatar"
                            />
                            {dropDownActive && (
                                <div className="drop-down">
                                    <div
                                        className="my-modal"
                                        onClick={toggleDropDown}
                                        role={"none"}
                                    ></div>
                                    <div className="arrow"></div>
                                    <div className="drop-down-content">
                                        <Link to={`/${user.id}`}>
                                            <div className="drop-down-item">
                                                <svg
                                                    aria-label="Profile"
                                                    color="#262626"
                                                    fill="#262626"
                                                    height="24"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                                </svg>
                                                <span>Profile</span>
                                            </div>
                                        </Link>
                                        <Link to="/account/edits">
                                            <div className="drop-down-item">
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
                                                <span>Setting</span>
                                            </div>
                                        </Link>
                                        <Link to="/logout">
                                            <div className="drop-down-item">
                                                <span>Logout</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <NewPost />
            </Container>
        </nav>
    );
};

export default MyNav;
