import { React, useEffect, useState } from "react";
import Logout from "./Logout";

const Dashboard = () => {
  const [userAuth, setUserAuth] = useState([]);
  const [laptops, setLaptops] = useState([]);

  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    setUserAuth(data);
    console.log("data", data)
    console.log("userAuth1", userAuth);
  };

  const allLaptops = async () => {
    console.log("userAuth3", userAuth);
    const response = await fetch("http://localhost:3001/dashboard", {
      method: "GET",
      headers: {
        authorization: `Bearer ${userAuth.accessToken}`,
      },
    });
    const parsedResponse = await response.json();
    setLaptops(parsedResponse);
  };

  useEffect(() => {
    getLocalStorage();
    console.log("userAuth2", userAuth)
    allLaptops();
  }, []);

  return (
    <div>
      <div> {laptops.devLaptop}</div>
      <Logout />
    </div>
  );
};

export default Dashboard;
