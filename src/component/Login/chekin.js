import React from "react";
import { Link } from "react-router-dom";
import "./chekin.css"

const Check=()=>{

    return(
        <div className="Check__box">
            <h2>직종을 선택해 주세요</h2>
            <Link className="solo__link" to={"/Join"}>
            <div className="solo__box"> 개인</div>
            </Link>
            <div className="business__box">기업</div>
        </div>
    )

}
export default Check