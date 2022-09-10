import './App.css';

import Login from "./components/Login";

import Signup from "./components/Signup";
import Sessions from "./components/SessionList";


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";import * as React from 'react';
// import AppBar from '@mui/material/AppBar';



function App() {

  return (

<Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/index" element={<Sessions />} />
    </Routes>
</Router>

  );
}

export default App;
