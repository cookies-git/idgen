import React, { useState, useEffect } from "react";
import LogoutModal from "./subcomponents/LogoutModal";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home(props) {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    const response = await fetch("https://backendforUser.sreesankaras29.repl.co/isUserAuth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }
    );
    const datas = await response.json();
    setData(datas);
  }

  return (
    <>{!data ? <p>Loading...</p> :
      data.isLoggedIn === true ?
        <>
          <p>I am home</p>
          <LogoutModal />
        </>

        :
        <p>you're not authorized to see this page.</p>
    }
    </>
  );
}

export default Home;
