import React from "react";

const Logo = (props) => {
    const {
        className
    } = props;
    return (
        <div className={`logo ${className}`}>
            <img src="/logo.png" alt="Keep" />
        </div>
    );
}

export default Logo;