import { useState } from 'react';
import styles from '../styles/ResetPassword.module.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otpNot, setOtpNot] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://backendforUser.sreesankaras29.repl.co/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setMessage(data.message);
      setOtp('');
      setOtpNot(data.Motp)
      console.log(otpNot)
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
    }
  };


  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    } else if (newPassword === "" && confirmPassword === "") {
      setMessage("Password field cannot be empty")
      return;
    }
    try {
      const response = await fetch('https://backendforUser.sreesankaras29.repl.co/password/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();
      setMessage(data.message);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  if (otpNot !== 'success') {
    return (

      <div className={styles.resetBody}>
        <div className={styles.headingClass}>
          <p>Reset Password</p>
        </div>
        <form onSubmit={handleEmailSubmit} className={styles.form}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" value={email} onChange={(event) => setEmail(event.target.value)} place- />

          </div>

          <button type="submit" className={styles.button}>Send OTP</button>
          <p className={styles.message}>{message}</p>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.resetBody}>
        <form onSubmit={handlePasswordSubmit} className={styles.form}>
          <label for="otp" className={styles.label}>
            OTP:
            <input type="text" id="otp" value={otp} onChange={(event) => setOtp(event.target.value)} className={styles.input} />
          </label>
          <label className={styles.label}>
            New Password:
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={styles.input} />
          </label>
          <label className={styles.label}>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={styles.input} />
          </label>
          <button type="submit" className={styles.button}>Reset Password</button>
          <p className={styles.message}>{message}</p>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
