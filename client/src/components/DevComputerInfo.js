import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormUpdateDevComputer from "./FormUpdateDevComputer";
import differenceInDays from '../utils/util'

import "../css/devComputerInfo.css";

const DevComputerInfo = ({ laptop, renderDevComputer }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  // const [updatedComputer, setUpdatedComputer] = useState();
  const [currentComputer] = useState(laptop[0]);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleDelete = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    const response = await fetch(
      `http://localhost:3001/dashboard/${laptop[0].computerID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: bearer,
        },
      }
    );
    // console.log(response);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowForm(!showForm);
  };

  const renderUpdate = (formInput) => {
    // setUpdatedComputer(formInput);
    // console.log('devComInfo', formInput);
    renderDevComputer(formInput);
  };

  return (
    <div className="devComputerInfoContainer">
      <div className='devComputerCard'>
        <div><h2>{currentComputer.computerID}</h2></div>
        <div><img className="laptop__image" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="laptop" /></div>
        <div><p> Serial#: {currentComputer.serialNO}</p></div>
        <div><p> Current User: {currentComputer.users[0]}</p></div>
        <div><p> Current Status: {currentComputer.status}</p></div>
        <div><p> Licence Link: <a className="devComputerCard__link" href={`${currentComputer.licenseLink}`} target="blank"> Link </a></p></div>
        <div><p> Handout Date: {currentComputer.handoutDate ? currentComputer.handoutDate.split('T')[0] : "-"}</p></div>
        <div><p> Days since Handout: {currentComputer.status === "Handed out" && currentComputer.handoutDate !== null ? differenceInDays(currentComputer.handoutDate) : "0"} </p></div>
        <div className="devComputerCart">
          <button className="devComputerCard__edit-button" onClick={handleEdit}> Edit </button>
          <button className="devComputerCard__delete-button" onClick={handleDelete}> Delete </button>
        </div>
        {showForm && <FormUpdateDevComputer callback={renderUpdate} currentComputer={currentComputer} />}
      </div>
      <div className="historyCard">
        <div className="userHistoryCard">
          <h3> User History </h3>
          <p> Feature coming soon...</p>
        </div>
        <div className="deviceHistoryCard">
          <h3> Device History </h3>
          <p> Feature coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default DevComputerInfo;
