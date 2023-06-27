import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button.jsx';
import addIcon from '../../assets/Icons/addIcon.svg'
import './home.css'

export default function Home() {

    return (
        <div className='home'>
            {/* <Header /> */}
             <div className='tab'> 
                 <div>
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
                  />
             </div>
        </div>
    )
}



