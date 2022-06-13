import React from "react";
import { useSelector } from "react-redux";

const Comment = () => {

    const newComment = useSelector(state => state.comment);
    
    return (
        <>
            {newComment.map((item, index) => {
                return (
                    <li key={index}>
                        <div className="comment-item">
                            <div className="avatar">
                                <img
                                    src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${item.user.avatar}`}
                                    alt="default"
                                />
                            </div>
                            <div className="comment-content">
                                <div className="content">
                                    <span className="name">
                                        {item.user.username}
                                    </span>
                                    {item.comment}
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })
            }
        </>
    );
}


export default Comment;