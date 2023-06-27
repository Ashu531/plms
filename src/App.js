import React from 'react';
import './App.css';
import Status from './components/status/status.jsx';
import Home from './screens/home/home.jsx';

function App() {
  return (
    <div className="App">
      <Status 
        lightText={'478 Cases'}
        boldText={'All'}
        bgColor={`#F7F0FF`}
        textColor={`#8F14CC`}
      />
    </div>
  );
}

export default App;
