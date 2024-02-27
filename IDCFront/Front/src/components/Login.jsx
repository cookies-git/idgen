import React, { useState, useEffect } from "react";
import signInStyle from "../styles/signInStyle.module.css";
import { useNavigate } from "react-router-dom";
import ErrorPops from "./subcomponents/ErrorPops";
import SignUpPopUp from "./subcomponents/SignUpPopUp.jsx";

function Login(props) {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [triggering, setTriggering] = useState(false);
  const [triggeringin, setTriggeringin] = useState(false);



  const navigate = useNavigate();

  //formstyles

  const handleFocus = (event) => {
    const label = event.target.nextElementSibling;
    label.style.top = "0px";
    label.style.left = "15px";
    label.style.fontSize = "10px";
    label.style.color = "#039be5";
    label.style.fontFamily = "Mitr";
  };

  const handleBlur = (event) => {
    const label = event.target.nextElementSibling;
    if (event.target.value === "") {
      label.style.top = "15px";
      label.style.left = "15px";
      label.style.fontSize = "16px";
      label.style.color = "#999";
      label.style.fontFamily = "Mitr";
    }
  };

  //formStylesends


  //Checking user is loggedIn or Not

  async function fetchData() {
    const response = await fetch("https://backendforUser.sreesankaras29.repl.co/isUserAuth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });
    const isUserauth = await response.json();
    setData(isUserauth);
  }

  useEffect(() => {
    fetchData();
  });

  //data collecting from form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // redirection
  const redirectToHome = () => {
    navigate("/home");
  }

  //data submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://backendforUser.sreesankaras29.repl.co/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setErrorMessage(data.message);
        redirectToHome(); // Redirect to the "home" page
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage(err)
    }
  };

  return (
    <> {!data ? <div className={signInStyle.loadingD}><img src="./loading.svg" alt="Loading..." /></div> :
      data.isLoggedIn === true ? redirectToHome() :
        <>
          <ErrorPops triggerError={errorMessage} setClose={setErrorMessage} />
          <SignUpPopUp trigger={triggering} setCloseSignUp={setTriggering} />
          <div className={signInStyle.bodySign}>
            <div className={signInStyle.header}>
              <img src="./logoICT.png" alt="logo" />
              <h2 className={signInStyle.heading}>Sign in to ICTAK</h2>
            </div>
            <form className={signInStyle.formSignin} onSubmit={handleSubmit}>
              <div className={signInStyle.inputcontainer}>
                <input className={signInStyle.inputClass}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="input1"
                  required />
                <label className={signInStyle.labelClass}
                  htmlFor="input1">Email Address</label>
              </div>
              <div className={signInStyle.inputcontainer}>
                <input className={signInStyle.inputClass}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="input2"
                  required />
                <label className={signInStyle.labelClass}
                  htmlFor="input2">Password</label>
              </div>
              <button className={signInStyle.buttonClass}
                type="submit">Submit</button>
            </form>
            <button className={signInStyle.buttonForgotClass}>Forgot Password</button>
            <div className={signInStyle.separator}>
              <div className={signInStyle.line}></div>
              <div className={signInStyle.or}>or</div>
              <div className={signInStyle.line}></div>
            </div>
            <div>
              <h5 className={signInStyle.littleHead}>Don't have an account?
                <span className={signInStyle.linkClass} onClick={() => {

                }}>Sign up</span></h5>
            </div>
          </div>
        </>
    }
    </>
  );
}

export default Login;