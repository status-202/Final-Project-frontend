import { React, useState } from "react";
// import { Link } from "react-router-dom";

import "../css/dashboard.css";

import DashboardDevComputers from "./DashboardDevComputers";
// import DashboardCoreComputers from "./DashboardCoreComputers";
// import DashboardCoreCellphones from "./DashboardCoreCellphones";

const Dashboard = () => {
  // 3 x states to deal with different dashboard features
  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  return (
    <div className="dashboard__container">
       <div className="dashboard__title">
         <div className="dashboard__user">
           {/* <small> Signed in as {userAuth.returnedData.user.name}</small> */}
           <div> <img src={userAuth.returnedData.user.imageUrl} alt="profile" className="profile-img" /> </div>
         </div>
         <h1> Dashboard </h1>
         <h2> Welcome, {userAuth.returnedData.user.givenName}!</h2>
       </div>
       <div> <DashboardDevComputers /> </div>
         {/* <DashboardCoreComputers /> */}
         {/* <DashboardCoreCellphones /> */}
     </div>
  )
};

export default Dashboard;
