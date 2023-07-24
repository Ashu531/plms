import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function App({token}) {
  return (
    <div className="App">
      <Home token={token} />
    </div>
  );
}
