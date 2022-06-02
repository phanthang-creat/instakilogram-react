import React, { useEffect, useState } from "react";
import "./component.scss"

const Phone = () => {

    const [imgList] = useState([
        {url: "/login/img1.png", alt: "img1", stt: " active"},
        {url: "/login/img2.png", alt: "img2", stt: ""},
        {url: "/login/img3.png", alt: "img3", stt: ""},
        {url: "/login/img4.png", alt: "img4", stt: ""},
    ])

    
    const animation = () => {
        let list = document.querySelectorAll(".phone-img__item");
        let i = 0;
        let timer = setInterval(() => {
            list[i].classList.remove("active");
            i++;
            if (i >= list.length) {
                i = 0;
            }
            list[i].classList.add("active");
        }
        , 5000);

        return () => {
            clearInterval(timer);
        }
    }
    // setInterval(animation, 3000);
    useEffect(() => {
        animation();
    }, [imgList])

    return (
        <div className="phone">
            <div className="phone-img">
            {
                imgList.map((img, index) => {
                    return (
                        <img key={index} src={img.url} alt={img.alt} className={`phone-img__item${img.stt}`} />
                    )
                })
            }
            </div>

        </div>
    )
}

export default Phone;