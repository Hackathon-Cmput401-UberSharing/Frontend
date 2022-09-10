import './App.css';
import Signup from "./components/Signup";

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
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
    </Router>

  );
}

export default App;
