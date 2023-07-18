import React,{useEffect, useState} from 'react'
import './header.css'
import userIcon from '../../assets/Icons/userIcon.svg'
import draftIcon from '../../assets/Icons/draftIcon.svg'
import downloads from '../../assets/Icons/downloads.svg'
import bellIcon from '../../assets/Icons/bellIcon.svg'
import logoutIcon from '../../assets/Icons/logoutIcon.svg'
import Search from '../search/search.jsx';

export default function Header({
    onSearchChange,
    goToDraftPage,
    screen,
    goToDownloads
}) {

  return (
   <div className='plms-header'>
       <div style={{width: '40%'}}>
           {
             screen === 0 && <Search
                                placeholder={'Search Leads'}
                                onChange={onSearchChange}
                            />
           }

            {/* {
             screen === 1 && <div className='header-title'>
                 Lead Detail
                 </div>
           } */}

           {
             screen === 2 && <div className='header-title'>
                 Drafts
                 </div>
           }

            {
             screen === 3 && <div className='header-title'>
                 Downloads
                 </div>
           }
        
       </div>
        <div className='header-content'>
            {/* <img src={userIcon} style={{width: '36px', height: '36px'}} /> */}
            <img src={draftIcon} style={{width: '36px', height: '36px',cursor: 'pointer'}} onClick={()=>goToDraftPage()} />
            <img src={downloads} style={{width: '36px', height: '36px',cursor: 'pointer'}} onClick={()=>goToDownloads()} />
            {/* <img src={bellIcon} style={{width: '36px', height: '36px'}} /> */}
            {/* <div className='logout-container'>
                <img src={logoutIcon} />
                <span className='logout-text'>Log Out</span>
            </div> */}
        </div>
   </div>
  )
}



