import { React, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "223152336662-ggl8sh19jb01koh6v4ekv28qefg2lg6b.apps.googleusercontent.com";

const Login = () => {
  const [userAuth, setUserAuth] = useState("");
  const onSuccess = async (res) => {
    // console.log("[login success] res:", res.profileObj);
    // console.log(res.tokenId);
    const token = res.tokenId;
    refreshTokenSetup(res);
    const data = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        profileObj: res.profileObj,
      }),
    });
    const returnedData = await data.json();
    setUserAuth(returnedData);
  };

  const setLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(userAuth));
  };

  useEffect(() => {
    setLocalStorage();
  }, [userAuth]);

  const onFailure = (res) => {
    console.log("[login failed] res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        uxMode="redirect"
        redirectUri="http://localhost:3000/dashboard"
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
