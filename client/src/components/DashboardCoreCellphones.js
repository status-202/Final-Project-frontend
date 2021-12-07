import { React, useState, useEffect } from "react";
import FormCreateCoreCellphone from "./FormCreateCoreCellphone";
import FormUpdateCoreCellphone from "./FormUpdateCoreCellphone";

const DashboardCoreCellphones = () => {
  const [cellphones, setCellphones] = useState([]);
  const [updatedCellphone, setUpdatedCellphone] = useState();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const getCoreCellphones = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/coreCellphones", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    setCellphones(parsedResponse);
  };

  useEffect(() => {
    getCoreCellphones();
  }, [updatedCellphone]);

  const renderCreateForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowCreateForm(!showCreateForm);
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        <th> Cellphone ID </th>
        <th> User </th>
        <th> imei </th>
        <th> Type </th>
        <th> Comments </th>
        <th></th>
      </tr>
    );
  };

  const renderTableData = () => {
    return cellphones.map((cellphone) => {
      return <FormUpdateCoreCellphone key={cellphone._id} cellphone={cellphone} callback={setUpdatedCellphone} />;
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
        <FormCreateCoreCellphone setUpdatedCellphone={setUpdatedCellphone} />
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

export default DashboardCoreCellphones;
