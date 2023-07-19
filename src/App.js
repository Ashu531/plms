import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';

export default function App({token}) {
  return (
    <div className="App">
      <Home token={"3de1186482cdde561ca24e0e03f0753cd2616eba"} />
    </div>
  );
}
