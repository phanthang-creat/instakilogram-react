import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import requestAPI from "../../../controller/API/requestAPI";
import { newComment } from "../../../redux/reducer/comment.reducer";
import { setPath } from "../../../redux/reducer/path.reducer";
import Comment from "./comment";

import "./post.scss";

const Post = () => {
    // group.GET("/post/:id", post.GetPostByIdPost) //Get post by id

    // group.GET("/post/user/:uid", post.GetPostByUid) //Get post by user id

    const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile);

    const [comment, setComment] = React.useState([]);

    const [postChose, setPostChose] = React.useState(null);

    const [post, setPost] = React.useState([]);

    const [indexImage, setIndexImage] = React.useState(0);

    const postChooseHandler = (post) => {
        return () => {
            let data = requestAPI(`/api/post/comment/${post.id}`, null, "GET");
            setTimeout(() => {
                data.then((res) => {
                    if (res === null) {
                        setComment([]);
                    } else {
                        res = res.reverse();
                        setComment(res);
                    }
                });
            }, 300);
            setPostChose(post);

        };
    };

    const commentHandler = (e) => {
        e.preventDefault();
        const comment = document.getElementById("comment").value;

        const tmp = {
            user: user,
            comment: comment,
        };
        //add to head of array
        const action = newComment(tmp);
        dispatch(action);
        document.getElementById("comment").value = "";
        //post to server
        const formData = new FormData();    
        formData.append("comment", comment);
        formData.append("post_id", postChose.id);
        let data = requestAPI(`/api/post/comment/${postChose.id}`, formData, "POST");
        setTimeout(() => {
            data.then((res) => {
                console.log(res);
            });
        }, 300);
    }

    let uid = window.location.pathname.split("/")[1] || "";

    let path = window.location.pathname.split("/")[2] || "";

    
    useEffect(() => {
        let payload = {
            path: path,
        };
        let action = setPath(payload);
        dispatch(action);

        let postData = requestAPI(`/api/post/user/${uid}`, null, "GET");
        setTimeout(() => {
            postData.then((res) => {
                if (res === null) {
                    setPost([]);
                } else {
                    if (res.length > 0) {
                        let tmp = [[]];
                        let i = 0,
                            j = 0;
                        res.map((item) => {
                            tmp[j][i] = item;
                            i++;
                            if (i === 3) {
                                i = 0;
                                j++;
                                tmp.push([[], [], []]);
                            }
                            return 1;
                        });
                        setPost(tmp);
                    } else {
                        setPost([[]]);
                    }
                }
            });
        }, 700);
    }, [path, dispatch, uid]);
    return (
        <div className="post">
            {post.length === 0 && (
                <article className="post-article">
                    <div className="post-article__left">
                        <img className="dfImg" src="/post/post_default.jpg" alt="default" />
                    </div>
                    <div className="post-article__right">
                        <div className="text">
                            <h2>Start capturing and sharing your moments.</h2>
                            <h3>Get the app to share your first photo or video.</h3>
                        </div>
                        <div className="download">
                            <div className="link">
                                <a
                                    href="https://itunes.apple.com/us/app/keep/id1224102379?mt=8"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src="/post/app_store.png" alt="app store" />
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.keepapp.keep"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src="/post/gg_play.png" alt="google play" />
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            )}
            {post.length > 0 && (
                <div className="post-list">
                    {post.map((item, index) => {
                        return (
                            <div className="post-list-row" key={index}>
                                {item.map((post, index) => {
                                    return (
                                        <div
                                            className="post-list-row-item"
                                            key={index}
                                            onClick={post.id ? postChooseHandler(post) : () => { }}
                                        >
                                            {post.id && (
                                                <>
                                                    <img
                                                         className="dfImg"
                                                        src={`${process.env.REACT_APP_SERVER_URL}/static/image/post/${post.image[0]}`}
                                                        alt="default"
                                                    />
                                                    <div className="screen-shadow"></div>
                                                    {post.image.length > 1 && (
                                                        <div className="list-icon">
                                                            <svg
                                                                aria-label="Carousel"
                                                                className="_ab6-"
                                                                color="#ffffff"
                                                                fill="#ffffff"
                                                                height="22"
                                                                role="img"
                                                                viewBox="0 0 48 48"
                                                                width="22"
                                                            >
                                                                <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    {postChose && (
                        <div className="post-modal">
                            <div
                                className="my-post-modal"
                                onClick={() => {
                                    setPostChose();
                                    setComment([]);
                                }}
                            ></div>
                            <div className="post-modal-container">
                                <div className="post-modal-container-content">
                                    <div className="list-image">
                                        <button
                                            className={`left-arrow arrow${indexImage === 0 ? " disable" : ""}`}
                                            onClick={() => {
                                                setIndexImage(indexImage - 1);
                                            }}
                                        >
                                            <div className="_9zm0 _9zm1"></div>
                                        </button>
                                        <button
                                            className={`right-arrow arrow${indexImage === postChose.image.length - 1 ? " disable" : ""}`}
                                            onClick={() => {
                                                setIndexImage(indexImage + 1);
                                            }}
                                        >
                                            <div className="_9zm0 _9zm2"></div>
                                        </button>
                                        <ul style={{width: `${100 * postChose.image.length}%`, transform: `translateX(${indexImage * -(100 / postChose.image.length)}%)`}}>
                                            {postChose.image.map((item, index) => {
                                                return (
                                                    <li className="list-image-item" key={index} style={{width: `${100 / postChose.image.length}%`}}>
                                                        <img
                                                            src={`${process.env.REACT_APP_SERVER_URL}/static/image/post/${item}`}
                                                            alt="default"
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className="comment">
                                        <div className="my-header">
                                            <div className="avatar">
                                                <img
                                                    src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${profile.user.avatar}`}
                                                    alt="default"
                                                />
                                            </div>
                                            <div className="username">
                                                <Link to={`/${profile.user.id}`}>
                                                    <div className="name">{profile.user.username}</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="list-comment">
                                            <ul>
                                                {postChose.caption && (
                                                    <>
                                                    <li>
                                                        <div className="comment-item">
                                                            <div className="avatar">
                                                                <img
                                                                    src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${profile.user.avatar}`}
                                                                    alt="default"
                                                                />
                                                            </div>
                                                            <div className="comment-content">
                                                                <div className="content">
                                                                    <span className="name">
                                                                        {profile.user.username}
                                                                    </span>
                                                                    {postChose.caption}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>                                                    
                                                    </>
                                                )}
                                                <Comment />
                                                {
                                                    comment.map((item, index) => {
                                                        return (
                                                            <li className="comment-item" key={index}>
                                                                <div className="avatar">
                                                                    <img
                                                                        src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${item.user[0].avatar}`}
                                                                        alt="default"
                                                                    />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="content">
                                                                        <span className="name">
                                                                            {item.user[0].username}
                                                                        </span>
                                                                        {item.comment.comment}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="comment-input">
                                                <div className="input-container">
                                                    <form onSubmit={commentHandler}>
                                                        <input 
                                                            id="comment"
                                                            className="_8-yf5"
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            // value={}
                                                            // onChange={(e) => setComment(e.target.value)}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn-send"
                                                        >
                                                            <svg
                                                                aria-label="Send"
                                                                fill="#262626"
                                                                height="24"
                                                                viewBox="0 0 48 48"
                                                                width="24"
                                                            >
                                                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Post;
