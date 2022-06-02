import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import MyNav from "../../components/nav/nav";
import NotFound from "../404/404";
import Logout from "../auth/logout";
import Edit from "../edit/edit";
import Inbox from "../inbox/inbox";
import NewFeed from "../newFeed/newFeed";
import Profile from "../profile/profile";

import "./home.scss";

const Home = () => {
    // console.log("Home");
    return (
        <div>
            <MyNav />
            <Container className="main">
                <main>
                    <Routes>
                        <Route path="/" element={<NewFeed />} />
                        <Route path="/:id/*" element={<Profile />} />
                        <Route path="/direct/inbox" element={<Inbox />} />
                        <Route path="/direct/inbox/:id" element={<h1>Direct Message</h1>} />
                        <Route path="/explore" element={<h1>Explore</h1>} />
                        <Route path="/account/edits/*" element={<Edit />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </main>
            </Container>
        </div>
    );
}


export default Home;