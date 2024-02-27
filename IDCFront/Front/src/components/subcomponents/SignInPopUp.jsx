import React from "react";
import popupstyle from "./popupstyle.module.css";
import Login from "../Login.jsx";
const SignInPopUp = (props) => {

  const handleClose = () => {
    props.onClose(false);
  };

  return (props.triggerin) ? (
    <>
      <div className={popupstyle.popup}>
        <div className={popupstyle.popupinner}>
          <div className={popupstyle.closebtn} onClick={() => props.setClose(false)}>
            <img src="./close.png" alt="close" /></div>
          <Login onClose={handleClose} setTriggering={props.setTriggering} />
        </div>
      </div>
    </>
  ) : null
}
export default SignInPopUp;