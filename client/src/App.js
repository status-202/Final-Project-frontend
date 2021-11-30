import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import * as React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

const Home = () => <h1>Home (Public)</h1>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li> <Link to="/login">Login</Link></li>
          <li> <Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}></Route>
          
            <Route exact path="/dashboard" element={
              <RequireAuth> 
                <Dashboard />
              </RequireAuth>
            }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
