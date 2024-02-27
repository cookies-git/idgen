import { useState } from 'react';
import resetDesign from '../styles/reset2.module.css';

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
      <div className={resetDesign.resetBody}>
                <img className={resetDesign.imgClass} src="/logo.png" />

              <div className={resetDesign.resetformBody}>
        <div className={resetDesign.headingClass}>
          <p>Reset Password</p>
        </div>
        <form onSubmit={handleEmailSubmit} className={resetDesign.form}>
          <div className={resetDesign['floating-form']}>
            <div className={resetDesign['floating-label']}>
              <input type="email" id="email" className={resetDesign['floating-input']} placeholder=" " value={email} onChange={(event) => setEmail(event.target.value)} />
              <span className={resetDesign.highlight}></span>
              <label htmlFor="email" className={resetDesign.label}>Email Address</label>
            </div>
          </div>
          <button type="submit" className={resetDesign.button}>Send OTP</button>
          <p className={resetDesign.message}>{message}</p>
        </form>
      </div>
      </div>
    );
  } else {
    return (
    <div className={resetDesign.resetBody}>
                <img className={resetDesign.imgClass} src="/logo.png" />

              <div className={resetDesign.resetformBody}>
        <div className={resetDesign.headingClass}>
          <p>Reset Password</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className={resetDesign.form}>

 <div className={resetDesign['floating-form']}>
            <div className={resetDesign['floating-label']}>
            <input type="text" id="otp" value={otp} onChange={(event) => setOtp(event.target.value)} className={resetDesign['floating-input']} placeholder=" "  />
<span className={resetDesign.highlight} ></span>
              <label htmlFor="otp" className={resetDesign.label}>OTP</label>
            </div>
          </div>
          
          <div className={resetDesign['floating-form']}>
            <div className={resetDesign['floating-label']}>
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={resetDesign['floating-input']} placeholder=" "  />
        <span className={resetDesign.highlight}></span>
              <label htmlFor="otp" className={resetDesign.label}>New Password</label>
            </div>
          </div>

          
        <div className={resetDesign['floating-form']}>
            <div className={resetDesign['floating-label']}>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={resetDesign['floating-input']} placeholder=" "   />
          <span className={resetDesign.highlight}></span>
              <label htmlFor="otp" className={resetDesign.label}>Confirm Password</label>
            </div>
          </div>

          <button type="submit" className={resetDesign.button}>Reset Password</button>
          <p className={resetDesign.message}>{message}</p>
        </form>
      </div>
        </div>
    );
  }
}

export default ResetPassword;
