/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import  DevComputerInfo from "./DevComputerInfo";

const DevComputer = () => {
  let params = useParams();
  const [laptop, setLaptop] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  const getLaptop = async () => {
    const bearer = 'Bearer ' + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/dashboard/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    // console.log(parsedResponse);
    setLaptop(parsedResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    getLaptop();
  }, [params.id]);

  return (
    <div>
      {!isLoading && (<DevComputerInfo laptop={laptop} />)}
    </div>
  )
}

export default DevComputer;