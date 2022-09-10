import './App.css';
import Main from "./components/Main";

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
      <Route exact path="/" element={<Main />} />
    </Routes>
</Router>

  );
}

export default App;
