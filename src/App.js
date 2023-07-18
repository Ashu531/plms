import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';

export default function App({token}) {
  return (
    <div className="App">
      <Home token={token} />
    </div>
  );
}
