import React from "react";
import requestAPI from "../../controller/API/requestAPI";

import "./search.scss";

const Search = () => {

    const [search, setSearch] = React.useState([]);

    const [modal, setModal] = React.useState(false);

    const onChange = () => {
        let param = document.getElementById("search").value;
        if (param !== "") {
            let data = requestAPI(`/api/user/search&q=${param}`);
            setTimeout(() => {
                data.then(res => {
                    if (res !== "user not found") {
                        setSearch(res);
                    } else {
                        setSearch([]);
                    }
                })
            }, 100);
        }
    }



    return (
        <div className="my-nav__search">
            <input
                onFocus={() => setModal(true)}
                onChange={onChange}
                id="search"
                type="text"
                placeholder="Search"
                className="my-nav__search-input"
                autoCapitalize="off"
                aria-label="Search Input"
                autoComplete="offcode"
                autoCorrect="off"
            />
            {modal && (
                <>
                    <div className="my-modal" onClick={() => setModal(false)}></div>
                    <div className="arrow"></div>
                    <div className="my-nav__search__dropdown">
                        <div className="result">
                            <ul className="result-list">
                                {search.length > 0 && search.map((item, index) => {
                                    return (
                                        <li className="result-list__item" key={index}>
                                            <a className="user" href={`/${item.id}`}>
                                                <div className="result-list__item__avatar">
                                                    <img src={`${process.env.REACT_APP_SERVER_URL}/static/image/avt/${item.avatar}`} alt="avatar" />
                                                </div>
                                                <div className="result-list__item__info">
                                                    <p className="username">
                                                        {item.username}
                                                    </p>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                    )})
                                }
                                {search.length === 0 && (
                                    <div>
                                        <p>No result</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}   

export default Search;