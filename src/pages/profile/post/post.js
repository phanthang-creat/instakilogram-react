import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPath } from "../../../redux/reducer/path.reducer";

import "./post.scss";


const Post = () => {

    const dispatch = useDispatch()
    let path = window.location.pathname.split("/")[2] || "";


    useEffect(() => {
        let payload = {
            path: path,
        }
        let action = setPath(payload);
        dispatch(action);
    }, [path, dispatch]);
    return (
        <div className="post">
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
                            <a href="https://itunes.apple.com/us/app/keep/id1224102379?mt=8" target="_blank" rel="noreferrer">
                                <img src="/post/app_store.png" alt="app store" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.keepapp.keep" target="_blank" rel="noreferrer">
                                <img src="/post/gg_play.png" alt="google play" />
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default Post;