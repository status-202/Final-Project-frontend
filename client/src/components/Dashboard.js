import { React, useEffect, useState } from "react";
import Logout from "./Logout";

const Dashboard = () => {
  const [laptops, setLaptops] = useState([]);
  
  const [userAuth, setUserAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  const allLaptops = async () => {
    const bearer = 'Bearer ' + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/dashboard", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    // console.log(parsedResponse)
    setLaptops(parsedResponse);
  };

  useEffect(() => {
    allLaptops();
  }, []);

  return (
    <div>
      <h1> hello world </h1>
      <div> {
        laptops.map((computer) => {
          return <p key={computer.SerialNO} > {computer.ComputerID} : {computer.users[0]} </p>
        })
      }</div>
      <Logout />
    </div>
  );
};

export default Dashboard;
