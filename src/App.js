import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';
import 'react-datez/dist/css/react-datez.css';

export default function App({token,student,onAddStudentClick}) {
  return (
    <div className="App">
      <Home token={token} student={student} onAddStudentClick={onAddStudentClick} />
    </div>
  );
}
