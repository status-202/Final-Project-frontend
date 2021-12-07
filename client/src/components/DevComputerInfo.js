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
    const confirmBox = window.confirm(
      "Do you really want to delete this device?"
    )
    if (confirmBox === true) {
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
        <div className="devComputerCard__computer-name"><h2>{currentComputer.computerID}</h2></div>
        <div className="laptopImage"></div>
        <div><p> Serial#: {currentComputer.serialNO}</p></div>
        <div><p> Current User: {currentComputer.users[0]}</p></div>
        <div><p> Current Status: {currentComputer.status}</p></div>
        <div><p> Licence Link: <a className="devComputerCard__link" href={`${currentComputer.licenseLink}`} target="blank"> Link </a></p></div>
        <div><p> Handout Date: {currentComputer.handoutDate ? currentComputer.handoutDate.split('T')[0] : "-"}</p></div>
        <div><p> Days since Handout: {currentComputer.status === "Handed out" && currentComputer.handoutDate !== null ? differenceInDays(currentComputer.handoutDate) : "0"} </p></div>
        <div className="devComputerCard__buttons">
          <button className="devComputerCard__edit-button" onClick={handleEdit}> Edit </button>
          <button className="devComputerCard__delete-button" onClick={handleDelete}> Delete </button>
        </div>
        {showForm && <FormUpdateDevComputer callback={renderUpdate} currentComputer={currentComputer} />}
      </div>
      <div className="historyCard">
        <div className="userHistoryCard">
          <h3> User History </h3>
          <div className="userHistoryTable__container">
            <table className="userHistoryTable__container__table">
                <tr>
                  <th>User</th>
                  <th>Name</th>
                  <th>Handed in date</th>
                  <th>Agreement</th>
                  <th>Comments</th>
                </tr>
                <tr>
                  <td>alfreds.autterkiste</td>
                  <td>Alfreds Futterkiste</td>
                  <td>2020-07-11</td>
                  <td>Link</td>
                  <td>Scratch on the back</td>
                </tr>
                <tr>
                  <td>kyle.danny</td>
                  <td>Kyle Danny</td>
                  <td>2021-08-19</td>
                  <td>Link</td>
                  <td>Space not working</td>
                </tr>
            </table>
          </div>
        </div>
        <div className="deviceHistoryCard">
          <h3> Device History </h3>
          <div className="deviceHistoryTable__container">
            <table className="deviceHistoryTable__container__table">
                <tr>
                  <th>Purchased</th>
                  <th>Model</th>
                  <th>Support</th>
                  <th>Insurance</th>
                  <th>Receipt</th>
                  <th>Comments</th>
                </tr>
                <tr>
                  <td>2019-07-11</td>
                  <td>Macbok Pro</td>
                  <td>-</td>
                  <td>Link</td>
                  <td>Link</td>
                  <td>-</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevComputerInfo;
