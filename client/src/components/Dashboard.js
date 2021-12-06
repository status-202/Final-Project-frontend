import { React, useState } from "react";
// import { Link } from "react-router-dom";

import "../css/dashboard.css";

import DashboardDevComputers from "./DashboardDevComputers";
import DashboardCoreComputers from "./DashboardCoreComputers";
import DashboardCoreCellphones from "./DashboardCoreCellphones";

const Dashboard = () => {
  const [renderDev, setRenderDev] = useState(true);
  const [renderCore, setRenderCore] = useState(false);
  const [, setRenderCell] = useState(false);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const renderDevComputers = () => {
    setRenderDev(true);
    setRenderCore(false);
    setRenderCell(false);
  };

  const renderCoreComputers = () => {
    setRenderCore(true);
    setRenderDev(false);
    setRenderCell(false);
  };
  const renderCoreCellphones = () => {
    setRenderCell(true);
    setRenderCore(false);
    setRenderDev(false);
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__title">
        <div className="dashboard__user">
          {/* <small> Signed in as {userAuth.returnedData.user.name}</small> */}
          <div>
            <img
              src={userAuth.returnedData.user.imageUrl}
              alt="profile"
              className="profile-img"
            />
          </div>
        </div>
        <h1> Dashboard </h1>
        <h2> Welcome, {userAuth.returnedData.user.givenName}!</h2>
      </div>
      <button onClick={renderDevComputers}>Dev Computers</button>
      <button onClick={renderCoreComputers}>Core Computers</button>
      <button onClick={renderCoreCellphones}>Core Cellphones </button>

      <div>
        {renderDev ? (
          <DashboardDevComputers />
        ) : renderCore ? (
          <DashboardCoreComputers />
        ) : (
          <DashboardCoreCellphones />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
