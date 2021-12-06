/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import "../css/dashboardDevComputers.css";
import differenceInDays from '../utils/util'

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormDevComputer from "./FormCreateDevComputer";

const DashboardDevComputers = () => {
  const [laptops, setLaptops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredData, setFilteredData] = useState(laptops);
  const [newComputer, setNewComputer] = useState();

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const parentCallback = (formInput) => setNewComputer(formInput);

  const handleSearch = (e) => {
    const filteredComputers = laptops.filter(laptop => {
      return (
        laptop.computerID.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setFilteredData(filteredComputers);
  };

  const allLaptops = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/dashboard", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    //console.log(parsedResponse)
    setLaptops(parsedResponse);
    setFilteredData(parsedResponse);
  };

  useEffect(() => {
    allLaptops();
    // return () => {
    //   setLaptops([])
    // }  
  }, [newComputer]);

  const renderForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowForm(!showForm);
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        <th> Computer ID </th>
        <th> Serial NO </th>
        <th> Information Link </th>
        <th> User </th>
        <th> Handout Date </th>
        <th> Days since Handout </th>
        <th> Status </th>
        <th> Licence Link </th>
      </tr>
    );
  };

  const renderTableData = () => {
    return filteredData.map((computer) => {
      const {
        _id,
        computerID,
        serialNO,
        informationLink,
        users,
        handoutDate,
        status,
        licenseLink,
      } = computer;
      return (
        <tr key={_id}>
          <td>
            <Link to={`/dashboard/${computerID}`}> {computerID} </Link>
          </td>
          <td>{serialNO}</td>
          <td>{informationLink}</td>
          <td>{users[0]}</td>
          <td>{handoutDate ? handoutDate.split("T")[0] : "-"}</td>
          <td className="center-item">{status === "Handed out" && handoutDate !== undefined && handoutDate !== null ? differenceInDays(handoutDate) : "0"} </td>
          <td>{status}</td>
          <td>
            <a href={`${licenseLink}`} target="blank">
              Link
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
  <div>
    <div className="devComputerCard__controls">
      <div>
        <label> Search: </label>
        <input type="text" onChange={(e) => handleSearch(e)} />
      </div>
      <div> <button onClick={renderForm} className="devComputerCard__delete-button"> Add new </button> </div>
    </div>
  { showForm && <FormDevComputer callback={parentCallback} /> }
  <div className="dashboard__table">
    <table className="styled-table">
      <thead>
        {renderTableHeaders()}
      </thead>
      <tbody className="dashboard__table-data">
        {renderTableData()}
      </tbody>
    </table>
  </div>
  </div>
  );
}

export default DashboardDevComputers;