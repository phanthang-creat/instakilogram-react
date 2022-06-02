import React from "react";
// import { io } from "socket.io-client";

import "./inbox.scss";

const  Inbox = () => {

    // const user = localStorage.getItem("user");
    // const userData = JSON.parse(user);
    // const textarea = document.getElementById("textarea");
    //auto resize textarea
    //=========================================================//
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        console.log(tx[i].scrollHeight);
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight - 22) + "px !important;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }
    //==============================//

    //declare socket
    // const socket = io("http://localhost:8000/socket.io/");
    // io.on("", () => {
    //     console.log("connected");
    // })
    // setTimeout(() => {
    //     console.log(socket);
    // }, 1000);

    // socket.on("", (data) => {
    //     console.log(data);
    // })

    React.useEffect(() => {
        const formHandler = document.getElementById("form");
        formHandler.addEventListener("submit", (e) => {
            e.preventDefault();
            
        });
    }, []);


    return (
        <div className="inbox">
            <div className="inbox-left">
                <div className="inbox-left-header my-header">
                    <div className="inbox-left-header-username">
                        <span>admin</span>
                    </div>
                </div>

                <div className="inbox-left-select-user">
                    <ul className="list-user">
                        <li className="list-user-item">
                            <div className="user">
                                {/* <img src={`${user.avatar}`} alt="avatar" /> */}
                                <div className="avatar"></div>
                                <div className="user-info">
                                    <span>admin2</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="inbox-right">
                <div className="inbox-right-header my-header">
                </div>
                <div className="inbox-right-content">
                    <ul className="message">

                    </ul>
                    <div className="message-form">
                        <form id="form">
                            <textarea id="textarea" type="text" placeholder="Type a message..." />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Inbox;