import React from "react";
import upPopstyle from "./upPopstyle.module.css";
import Signup from "../Signup.jsx";
const SignUpPopUp = (props) => {


  return (props.trigger) ? (
    <>
      <div className={upPopstyle.popup}>
        <div className={upPopstyle.popupinner}>
          <div className={upPopstyle.closebtn} onClick={() => props.setCloseSignUp(false)}>
            <img src="./close.png" alt="close" /></div>
          <Signup />
        </div>
      </div>
    </>
  ) : null
}
export default SignUpPopUp;