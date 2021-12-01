import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';

const DevComputerInfo = ({ laptop }) => {
  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  const navigate = useNavigate();

  const handleClick = async () => {
    const bearer = 'Bearer ' + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/dashboard/${laptop[0].computerID}`, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      },
    });
    // console.log(response);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <h2>{laptop[0].computerID}</h2>
      <p> Serial#: {laptop[0].serialNO}</p>
      <p> Current User: {laptop[0].users[0]}</p>
      <p> Current Status: {laptop[0].status}</p>
      <p> Licence Link: {laptop[0].licenseLink}</p>
      <p> Days since Handout: {laptop[0].handoutDate}</p>
      <button onClick={handleClick}> Delete </button>
      <h2> User History </h2>
      <p>...</p>
      <h2> Device History </h2>
      <p>...</p>
    </div>
  )
}

export default DevComputerInfo;