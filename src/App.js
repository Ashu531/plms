import React from 'react';
import './App.css';
import Status from './components/status/status.jsx';

export default function App({props}) {
  return (
    <div className='App'>
      <div className='row' style={{width: '100%', height: '70px', gap: '10px', justifyContent: 'space-between'}}>
        <Status 
          lightText={'478 Cases'}
          boldText={'All'}
          bgColor={`#F7F0FF`}
          textColor={`#8F14CC`}
        />

        <Status 
          lightText={'478 Cases'}
          boldText={'Incomplete'}
          bgColor={`#0DB78F`}
          textColor={`#FFFFFF`}
          style={{padding: '14px'}}
        />

        <Status 
          lightText={'478 Cases'}
          boldText={'In Process'}
          bgColor={`#F7F0FF`}
          textColor={`#8F14CC`}
        />

        <Status 
          lightText={'478 Cases'}
          boldText={'Closed'}
          bgColor={`#F7F0FF`}
          textColor={`#8F14CC`}
        />

        <Status 
          lightText={'478 Cases'}
          boldText={'Approved'}
          bgColor={`#F7F0FF`}
          textColor={`#8F14CC`}
        />

        <Status 
          lightText={'478 Cases'}
          boldText={'Disbursed'}
          bgColor={`#F7F0FF`}
          textColor={`#8F14CC`}
        />
      </div>
    </div>
  );
}
