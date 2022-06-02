import React from "react";

const NewFeed = () => {

    React.useEffect(() => {
        console.log("NewFeed");
    }, []);

    return (
        <div>
            <h1>NewFeed</h1>
        </div>
    );
}

export default NewFeed;