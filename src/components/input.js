import React, { useState } from "react";

import "./component.scss";

const Input = (props) => {
    const {
        type,
        name,
        placeholder,
        value,
        // onBlur,
        // onFocus,
        // error,
        id,
        className,
        ...rest
    } = props;

    const [btn, setBtn] = useState(false);
    const [show, setShow] = useState(false);
    const [handlerSpan, setHandlerSpan] = useState(false);

    const onChange = (e) => {
        if (e.target.value !== "") {
            // let handler = document.querySelector(".login__form__submit");
            if (e.target.type === "password") {
                setBtn(true);
            }
            setHandlerSpan(true);
        } else {
            setShow(false);
            setBtn(false);
            setHandlerSpan(false);
        }
    }

    const showHandler = () => {
        setShow(!show);
    }

    // useEffect(() => {
        
    // }, []);

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                <span className={`${className}__label__span${handlerSpan ? " active" : ""}`}>{placeholder}</span>
                <input
                    id={id}
                    type={type === "password" ? `${show ? "text" : "password"}` : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${className}__input`}
                    autoComplete="new-password"
                    autoCapitalize="off"
                    autoCorrect="off"
                    // style={{display: "none"}}
                    {...rest}
                />
            </label>
            {type === "password" && (
                btn && (
                    <div className={`${className}__show-password`}>
                        <button 
                            type="button"
                            className={`${className}__show-password__btn`}
                            onClick={showHandler}
                        >
                            {show ? "Hide" : "Show"}
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

    export default Input;