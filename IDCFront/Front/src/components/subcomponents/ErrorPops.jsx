import React from "react";
import errorPopupstyle from "./errorPopupstyle.module.css";

const ErrorPops = (props) => {

  return (props.triggerError.trim() !== '') ? (
    <>
      <div className={errorPopupstyle.popup}>
        <div className={errorPopupstyle.popupinner}>
          <p className={errorPopupstyle.errorMessage}>{props.triggerError}</p>
          <div className={errorPopupstyle.buttonDesign}>
            <button className={errorPopupstyle.closebtn} onClick={() => props.setClose("")}>

              Ok
            </button>
            {props.triggerError === "Mail address has already been taken" ? <button className={errorPopupstyle.closebtn} onClick={() => props.setClosed("")}> Sign in </button> : null}
          </div>
        </div>
      </div>
    </>
  ) : null
}
export default ErrorPops;