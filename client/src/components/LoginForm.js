import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const LoginForm = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />,
    document.getElementById("googleButton")
  );
};

export default LoginForm;
