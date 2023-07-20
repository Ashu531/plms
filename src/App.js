import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';

export default function App({token}) {
  return (
    <div className="App">
      <Home token={'fa37751d9684601b979b19cecafc599748b77e75'} />
    </div>
  );
}
