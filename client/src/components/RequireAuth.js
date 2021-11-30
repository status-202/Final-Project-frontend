import * as React from "react";
import { useState } from "react";
// import { useAuth } from "./UseAuth";
// import { Navigate } from "react-router-dom";
import Login from "./Login";

export default function RequireAuth({ children }) {
  const [userAuth, setUserAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  return userAuth.loggedIn === true
    ? children 
    : <Login />
}
