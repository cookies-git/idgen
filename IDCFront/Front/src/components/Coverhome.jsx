import React, { useState, useEffect } from "react";
import chome from '../styles/chome.module.css';
import SignInPopUp from "./subcomponents/SignInPopUp.jsx";
import SignUpPopUp from "./subcomponents/SignUpPopUp.jsx";

import { useNavigate } from "react-router-dom";

function Coverhome(props) {
  const [triggering, setTriggering] = useState(false);
  const [triggeringin, setTriggeringin] = useState(false);

  const [data, setData] = useState();
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/home");
  }

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
  }, []);

  return (
    <>{!data ? <div className={chome.loadingD}><img src="./loading.svg" alt="Loading..." /></div> :
      data.isLoggedIn === true ? redirectToHome() :
        <>
          <SignUpPopUp trigger={triggering} setCloseSignUp={setTriggering} />
          <SignInPopUp triggerin={triggeringin} setClose={setTriggeringin} onClose={setTriggeringin} />

          <div className={chome.container}>
            <div className={chome.body}>
              <div className={chome.leftHome}>
                <div className={chome.imageoverlay}>
                  <img src="./leftCover.svg" alt="Cover Page" />
                </div>
              </div>
              {/* lefhome close  */}
              <div className={chome.rightHome}>
                <div className={chome.logo}>
                  <img src="./logoICT.png" alt="logo" />
                </div>
                {/* logo class close */}
                <div className={chome.heading}>
                  <h1 className={chome.headingFirst}>Make your ID now</h1>
                  <h3 className={chome.headingSecond}>Join ICTAK today.</h3>
                </div>
                {/* heading class close */}
                <div className={chome.buttonClass}>
                  <button className={chome.buttonSignup} onClick={() => setTriggering(true)} >Create account</button>

                  <div className={chome.buttonText}>By signing up, you agree to the <span className={chome.linkspan}>Terms of Service</span> and <span className={chome.linkspan}>Privacy Policy,</span> including <span className={chome.linkspan}>Cookie Use.</span></div>
                  <div className={chome.separator}>
                    <div className={chome.line}></div>
                    <div className={chome.or}>or</div>
                    <div className={chome.line}></div>
                  </div>
                  {/* Separator class close  */}
                  <div className={chome.signInMod}>
                    <h4 className={chome.signinHead}>Already have an account?</h4>
                    <button className={chome.buttonSignin} onClick={() => { setTriggeringin(true); }}>Sign in</button>
                  </div>
                </div>
                {/* Button class close */}

              </div>
              {/* Right Home close */}

            </div>
            {/* body close */}
            <div className={chome.links}>
              <p className={chome.linkType}> About </p>
              <p className={chome.linkType}> Help Center</p>
              <p className={chome.linkType}> Terms of Service</p>
              <p className={chome.linkType}> Privacy Policy</p>
              <p className={chome.linkType}> Cookie Policy</p>
              <p className={chome.linkType}> Accessibility</p>
              <p className={chome.linkType}> Blog</p>
              <p className={chome.linkType}> Careers</p>
              <p className={chome.linkType}> Marketing</p>
              <p className={chome.linkType}> for Business</p>
              <p className={chome.linkType}> Developers</p>
              <p className={chome.linkType}> Directory</p>
              <p className={chome.linkType}> Settings</p>
              <p className={chome.linkType}> © 2023 ICTAK</p>
            </div>
          </div>
        </>

    }
    </>
  );
}

export default Coverhome;
