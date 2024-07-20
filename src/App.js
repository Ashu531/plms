import React from 'react';
import './App.css';
import Home from './screens/home/home.js';
import Login from './screens/login/login.js'
import 'react-datez/dist/css/react-datez.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckAuthentication from '../src/components/checkAuthentication.js'

const AuthenticatedHome = CheckAuthentication(Home);

export default function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/login/*" element={<Login/>} />
            <Route path="/dashboard" element={<AuthenticatedHome />} />
            <Route path="/*" element={<AuthenticatedHome />} />
          </Routes>
      </Router>
   </div>
  );
}
