import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormCreateCoreComputer from "./FormCreateCoreComputer";
import FormUpdateCoreComputer from "./FormUpdateCoreComputer";

const DashboardCoreComputers = () => {
  const [coreComputers, setCoreComputers] = useState([]);
  const [updatedComputer, setUpdatedComputer] = useState();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const getCoreComputers = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/coreComputers", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    setCoreComputers(parsedResponse);
  };

  useEffect(() => {
    getCoreComputers();
    // return () => {
    //   setCoreComputers([])
    //   setShowCreateForm(false)
    // }  
  }, [updatedComputer]);

  const renderCreateForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowCreateForm(!showCreateForm);
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        <th> Computer ID </th>
        <th> Serial NO </th>
        <th> Type </th>
        <th> Licence Link </th>
        <th> Users </th>
        <th> Comments </th>
        <th> File Value Key </th>
        <th> Handout Date </th>
        <th> Charger Number </th>
        <th></th>
      </tr>
    );
  };

  const renderTableData = () => {
    return coreComputers.map((computer) => {
      return <FormUpdateCoreComputer key={computer._id} computer={computer} callback={setUpdatedComputer} />;
    });
  };

  return (
    <div>
      <div className="devComputerCard__controls">
        <div>
          <button
            onClick={renderCreateForm}
            className="devComputerCard__delete-button"
          >
            Add new
          </button>
        </div>
      </div>
      {showCreateForm && (
        <FormCreateCoreComputer setUpdatedComputer={setUpdatedComputer} />
      )}
      <div className="dashboard__table">
        <table className="styled-table">
          <thead>{renderTableHeaders()}</thead>
          <tbody className="dashboard__table-data">{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCoreComputers;
