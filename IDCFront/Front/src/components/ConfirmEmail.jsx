import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/confirmEmail.module.css";

function ConfirmEmail(props) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract email from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      navigate("/");
    }
  }, [location.search, navigate]);

  useEffect(() => {
    // Enable the Resend button after 5 minutes
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate OTP
    if (otp === "") {
      setErrorMessage("Please enter the OTP");
    } else {
      const response = await fetch('https://backendforUser.sreesankaras29.repl.co/signup2/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        })
      });
      const data = await response.json();
      if (data.message === "OTP verified.") {
        setErrorMessage("OTP Verified");
        navigate("/");
      } else {
        setAttempts(attempts + 1);
        setErrorMessage("Invalid OTP. Please try again.");

        // Disable Resend button after 3 attempts
        if (attempts >= 3) {
          setErrorMessage("You have exceeded the maximum number of attempts. Please try again later.");
          setCountdown(100);
          setAttempts(0);
        }
      }
    }
  };
  const handleResend = async () => {
    setAttempts(0);
    setCountdown(100);
    setErrorMessage("");

    const response = await fetch('https://backendforUser.sreesankaras29.repl.co/signup2/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });
    if (!response.ok) {
      console.log(err)
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles["confirm-email-container"]}>
      <h2 className={styles.title}>Confirm Email</h2>
      <p className={styles.message}>Please enter the OTP sent to your email address {email}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label className={styles.label} htmlFor="otp">
            OTP:
          </label>
          <input
            className={styles.input}
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit" className={styles.button} disabled={attempts >= 2}>
            Submit
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleResend}
            disabled={countdown > 0 || attempts >= 2}
          >
            Resend
          </button>
          <button type="button" className={styles.button} onClick={handleCancel}>Cancel</button>
        </div>
        <p className={errorMessage == "OTP Verified" ? styles["success-message"] : styles["error-message"]}>{errorMessage}</p>
        {countdown > 0 && (
          <p className={styles["countdown-message"]}>You can resend the OTP in {countdown} seconds</p>
        )}
      </form>
    </div>
  );
}

export default ConfirmEmail;
