import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { newPost } from "../../redux/reducer/newPost.reducer";

import "./newPost.scss";
import "../profile/post/post.scss";
import { Spinner } from "react-bootstrap";
import requestAPI from "../../controller/API/requestAPI";

const NewPost = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const status = useSelector((state) => state.newPost.status);

  const [newImage, setNewImage] = React.useState([]);

  const [spinner, setSpinner] = React.useState(false);

  // const [formImage, setFormImage] = React.useState(null);4

  const [indexImage, setIndexImage] = React.useState(0);

  const newImageHandler = (e) => {
    console.log(e.target.files[0]);
    const [file] = e.target.files;
    if (file) {
      let tmp = {
        file: file,
        name: file.name,
        src: URL.createObjectURL(file),
      };
      setNewImage((newImage) => [...newImage, tmp]);
    }
  };

  const shareHandler = (e) => {
    e.preventDefault();
    setSpinner(true);
    if (newImage.length === 0) {
        alert("Please add image");
        setSpinner(false);
        return;
    }
    const caption = document.getElementById("caption").value;
    let formData = new FormData();
    formData.append("uid", user.id);
    formData.append("caption", caption);
    formData.append("quantityImage", newImage.length);
    newImage.forEach((image, index) => {
        formData.append(`image${index}`, image.file, image.name);
    });

    const data = requestAPI("/api/post/create", formData, "POST");
    
    data.then((res) => {
        if (res.id) {
            alert("Success");
            const action = newPost({ status: false });
            dispatch(action);
            setNewImage([]);
            setSpinner(false);
        }
    });
}

  const removeImageHandler = (index) => {
    return () => {
      if (indexImage > 0) {
        setIndexImage(indexImage - 1);
      }
      setNewImage((newImage) => {
        newImage.splice(index, 1);
        return [...newImage];
      });
    };
  };

  // style={{ width: `${100 * postChose.image.length}%`, transform: `translateX(${indexImage * -(100 / postChose.image.length)}%)` }}

  return (
    <>
      {status && (
        <div className="new-post-modal my-modal">
          <div
            className="my-post-modal"
            onClick={() => {
              const action = newPost({ status: false });
              dispatch(action);
            }}
          ></div>
          <div className="new-post">
            <div className="post-modal-container">
              <div className="post-modal-container-content">
                <div className="list-image new-image">
                  {newImage.length === 0 && (
                    <div className="new-image-default">
                      <div className="header">Create new post</div>
                      <div className="new-image-default-icon">
                        <svg
                          aria-label="Icon to represent media such as images or videos"
                          className="_ab6-"
                          color="#262626"
                          fill="#262626"
                          height="77"
                          role="img"
                          viewBox="0 0 97.6 77.3"
                          width="96"
                        >
                          <path
                            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="new-image-default-input">
                        <label htmlFor="newImage">Select from computer</label>
                      </div>
                    </div>
                  )}
                  {newImage.length > 0 && (
                    <>
                      <button
                        className={`left-arrow arrow${
                          indexImage === 0 ? " disable" : ""
                        }`}
                        onClick={() => {
                          setIndexImage(indexImage - 1);
                        }}
                      >
                        <div className="_9zm0 _9zm1"></div>
                      </button>
                      <button
                        className={`right-arrow arrow${
                          indexImage === newImage.length - 1 ? " disable" : ""
                        }`}
                        onClick={() => {
                          setIndexImage(indexImage + 1);
                        }}
                      >
                        <div className="_9zm0 _9zm2"></div>
                      </button>
                      <label
                        htmlFor="newImage"
                        className="new-image-input bottom"
                      >
                        <div>
                          <svg
                            aria-label="Open media gallery"
                            className="_ab6-"
                            color="#ffffff"
                            fill="#ffffff"
                            height="16"
                            role="img"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <path
                              d="M19 15V5a4.004 4.004 0 00-4-4H5a4.004 4.004 0 00-4 4v10a4.004 4.004 0 004 4h10a4.004 4.004 0 004-4zM3 15V5a2.002 2.002 0 012-2h10a2.002 2.002 0 012 2v10a2.002 2.002 0 01-2 2H5a2.002 2.002 0 01-2-2zm18.862-8.773A.501.501 0 0021 6.57v8.431a6 6 0 01-6 6H6.58a.504.504 0 00-.35.863A3.944 3.944 0 009 23h6a8 8 0 008-8V9a3.95 3.95 0 00-1.138-2.773z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                      <ul
                        style={{
                          width: `${100 * newImage.length}%`,
                          transform: `translateX(${
                            indexImage * -(100 / newImage.length)
                          }%)`,
                        }}
                      >
                        {newImage.map((item, index) => {
                          return (
                            <li
                              className="list-image-item"
                              key={index}
                              style={{ width: `${100 / newImage.length}%` }}
                            >
                              <img src={item.src} alt="default" />
                              <div
                                className="new-image-delete new-image-input top"
                                onClick={removeImageHandler(index)}
                              >
                                <div>
                                  <svg
                                    aria-label="Delete"
                                    className="_ab6-"
                                    color="#ffffff"
                                    fill="#ffffff"
                                    height="12"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="12"
                                  >
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      x1="21"
                                      x2="3"
                                      y1="3"
                                      y2="21"
                                    ></line>
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      x1="21"
                                      x2="3"
                                      y1="21"
                                      y2="3"
                                    ></line>
                                  </svg>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  <input
                    id="newImage"
                    type="file"
                    name="newImage"
                    accept="image/x-png,image/gif,image/jpeg"
                    // disabled
                    style={{ display: "none" }}
                    onChange={newImageHandler}
                  />
                </div>
                <div className="comment">
                  <div className="my-header">
                    <div className="avatar">
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${user.avatar}`}
                        alt="default"
                      />
                    </div>
                    <div className="username">
                      <Link to={`/${user.id}`}>
                        <div className="name">{user.username}</div>
                      </Link>
                    </div>
                  </div>
                  <div className="list-comment caption-form">
                    <textarea
                      id="caption"
                      className="text-area"
                      placeholder="Write a caption..."
                    />
                  </div>
                  <div className="share" onClick={shareHandler}>
                    {spinner === false && (
                      <button className="share__btn">Share</button>
                    )}
                    {spinner === true && (
                      <Spinner
                        variant="light"
                        size={"sm"}
                        color="#fff"
                        animation="border"
                        role="status"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
