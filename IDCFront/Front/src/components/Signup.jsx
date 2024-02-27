import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpstyles from "../styles/signup2.module.css";
import ErrorPops from "./subcomponents/ErrorPops";


function Signup(props) {
  const [formData, setFormData] = useState({ fname: "", sname: "", dob: "", email: "", phone: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== confirmPassword) {
      setErrorMessage("Please ensure that the password and confirm password fields match.");
    }
    else if (formData.email === "" || formData.dob === "" || formData.fname === "" || formData.sname === "" || formData.phone === "" || formData.password === "") {
      setErrorMessage("All fields are mandatory");
    }
    else {
      try {
        const res = await fetch("https://backendforUser.sreesankaras29.repl.co/signup2", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (res.status === 201) {
          navigate("/confirm-otp?email=" + formData.email);
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        setErrorMessage(err)
      }
    }
  };


  return (
    <div className={SignUpstyles.container}>
      <div className={SignUpstyles.headingClass}>
        <div className={SignUpstyles.header}>
          <ErrorPops triggerError={errorMessage} setClosed={setErrorMessage} />
          <img src="./logoICT.png" alt="logo" />
          <h2 className={SignUpstyles.heading}>Join ICTAK today</h2>
        </div>
      </div>

      <form className={SignUpstyles.formClass} onSubmit={handleSubmit}>

        <div className={SignUpstyles.gridContainer}>
          <div className={SignUpstyles.group1}>
            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item1}`}>
              <input
                className={SignUpstyles.inputClass}
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input1"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input1">First Name</label>
            </div>



            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item2}`}>
              <input
                className={SignUpstyles.inputClass}
                type="text"
                name="sname"
                value={formData.sname}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input2"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input2">Second Name</label>
            </div>

          </div>

          <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.dateContainer} ${SignUpstyles.item3}`}>
            <input
              type="date"
              className={`${SignUpstyles.inputClass} ${SignUpstyles.inputDateClass}`}
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              id="input3"
              required
            />
            <label className={`${SignUpstyles.labeClass} ${SignUpstyles.dateLabel}`}
              htmlFor="input3">Date of Birth</label>
          </div>


          <div className={SignUpstyles.group2}>
            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item4}`}>
              <input
                type="email" className={SignUpstyles.inputClass}
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input4"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input4">Email Address</label>
            </div>



            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item5}`}>
              <input
                type="number" className={SignUpstyles.inputClass}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input5"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input5">Phone Number</label>
            </div>

          </div>

          <div className={SignUpstyles.group3}>
            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item6}`}>
              <input
                type="password" className={SignUpstyles.inputClass}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input6"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input6">Password</label>
            </div>


            <div className={`${SignUpstyles.inputcontainer} ${SignUpstyles.item7}`}>
              <input
                type="password" className={SignUpstyles.inputClass}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id="input7"
                required
              />
              <label className={SignUpstyles.labelClass}
                htmlFor="input7"> Confirm Password</label>
            </div>
          </div>
        </div>

        <button type="submit" className={SignUpstyles.formButton}>Submit</button>
        <div className={SignUpstyles.separator}>
          <div className={SignUpstyles.line}></div>
          <div className={SignUpstyles.or}>or</div>
          <div className={SignUpstyles.line}></div>
        </div>
        <div>
          <h5 className={SignUpstyles.littleHead}>Already have an account? <span className={SignUpstyles.linkClass}>Sign in</span></h5>
        </div>
        <div>
          {/* <div>
            {errorMessage === "Mail address has already been taken" && (
              <button className={SignUpstyles.loginButton} onClick={() => navigate("/")}>Login</button>
            )}
          </div> */}

        </div>
      </form>
    </div>

  );
}

export default Signup;
