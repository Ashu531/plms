import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button.jsx';
import addIcon from '../../assets/Icons/addIcon.svg'
import Status from '../../components/status/status.jsx';
import './home.css'
import Table from '../../components/table/table.jsx';
import Header from '../../components/header/header.jsx'

export default function Home() {

    return (
        <div className='home-container'>
            <Header />
            <div className='row' style={{width: '100%', height: '70px', gap: '10px', justifyContent: 'space-between'}}>
                <Status 
                lightText={'478 Cases'}
                boldText={'All'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Incomplete'}
                // bgColor={`#0DB78F`}
                // textColor={`#FFFFFF`}
                style={{padding: '14px'}}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'In Process'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Closed'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Approved'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Disbursed'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />
            </div>
             <div className='tab'> 
                 <div className='lead-count'>
                 Showing 478 Incomplete leads
                 </div>
                 <Button 
                    leadingIcon={addIcon}
                    text='Create'
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '150px',
                    }}
                    textClass={{
                        color: '#FFF',
                        fontSize: '16px',
                        fontFamily: 'Montserrat',
                        fontWeight: 500
                    }}
                  />
             </div>
             <div className='table-container'>
                <Table />
             </div>
             
        </div>
    )
}



