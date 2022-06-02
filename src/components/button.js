import React from "react";


const MyButton = (props) => {
    const {
        children,
        className,
        onClick,
        type,
        disabled,
        id,
        ...rest
    } = props;

    return (
        <button
            id={id}
            className={`button ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
}


export default MyButton;