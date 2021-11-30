import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UseAuth';

const clientId =
  "223152336662-ggl8sh19jb01koh6v4ekv28qefg2lg6b.apps.googleusercontent.com";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onSuccess = () => {
    console.log("Logout made successfully");
    logout().then(() => {
      navigate("/login");
    });
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
