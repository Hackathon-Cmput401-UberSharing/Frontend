import './App.css';
import Login from "./components/Login";

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
    </Routes>
</Router>

  );
}

export default App;
