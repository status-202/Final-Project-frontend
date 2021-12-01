/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import Logout from "./Logout";
import { Link } from 'react-router-dom';
import FormDevComputer from "./FormDevComputer"

const Dashboard = () => {
  const [laptops, setLaptops] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  const [newComputer, setNewComputer] = useState();

  const parentCallback = formInput => setNewComputer(formInput);

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
    //console.log(parsedResponse)
    setLaptops(parsedResponse);
  };

  useEffect(() => {
    allLaptops();
  }, [newComputer]);

  const renderTableData = () => {
    return laptops.map((computer) => {
      const { _id, computerID, serialNO, informationLink, users, handoutDate, status, licenseLink } = computer;
      return (
        <tr key={_id}>
           <td> <Link to={`/dashboard/${computerID}`}> {computerID} </Link> </td>
           <td>{serialNO}</td>
           <td>{informationLink}</td>
           <td>{users[0]}</td>
           <td>{handoutDate}</td>
           <td>{status}</td>
           <td>{licenseLink}</td>
        </tr>
      )
    })
  }

  const renderTableHeaders = () => {
    return <tr>
      <th> Computer ID </th>
      <th> Serial NO </th>
      <th> Information Link </th>
      <th> User </th>
      <th> Handout Date </th>
      <th> Status </th>
      <th> Licence Link </th>
    </tr>
  }

  const renderForm = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setShowForm(!showForm)
  }

  return (
    <div>
      <h1> Dashboard </h1>
      <button onClick={renderForm}> Add new </button>
      {showForm && (
        <FormDevComputer callback={parentCallback} />
      )}
      <table>
        <tbody>
          {renderTableHeaders()}
          {renderTableData()}
        </tbody>
      </table>
      <Logout />
    </div>
  );
};

export default Dashboard;
