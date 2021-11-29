import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "223152336662-ggl8sh19jb01koh6v4ekv28qefg2lg6b.apps.googleusercontent.com";

const Logout = () => {
  const onSuccess = () => {
    console.log("Logout made successfully");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};
export default Logout;
