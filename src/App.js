import React from 'react';
import './App.css';
import Home from './screens/home/home.jsx';
import 'react-datez/dist/css/react-datez.css';
import { setMixpanel } from './helpers/mixpanel';

export default function App({
  token,
  student,
  onAddStudentClick,
  removeStudentName, 
  Mixpanel
}) {

  setMixpanel(Mixpanel)

  return (
    <div className="App">
      <Home 
        token={token} 
        student={student} 
        onAddStudentClick={onAddStudentClick} 
        removeStudentName={removeStudentName}
      />
    </div>
  );
}
