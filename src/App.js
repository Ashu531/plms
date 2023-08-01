import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';
import 'react-datez/dist/css/react-datez.css';

export default function App({token}) {
  return (
    <div className="App">
      <Home token={token} />
    </div>
  );
}
