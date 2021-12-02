import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DevComputer from "./components/DevComputer";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

const Home = () => <h1>Home (Public)</h1>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}></Route>
          
            <Route exact path="/dashboard" element={
              <RequireAuth> 
                <Dashboard />
              </RequireAuth>
            }></Route>

            <Route exact path="/dashboard/:id" element={
              <RequireAuth> 
                <DevComputer />
              </RequireAuth>
            }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
