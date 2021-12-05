import { React } from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UseAuth';

const clientId =
  "223152336662-ggl8sh19jb01koh6v4ekv28qefg2lg6b.apps.googleusercontent.com";

const Logout = ( { setLoggedIn } ) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onSuccess = () => {
    console.log("Logout made successfully");
    setLoggedIn(false);
    logout().then(() => {
      navigate("/");
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
