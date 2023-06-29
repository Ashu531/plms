import React,{useEffect, useState} from 'react'
import './header.css'
import userIcon from '../../assets/Icons/userIcon.svg'
import draftIcon from '../../assets/Icons/draftIcon.svg'
import downloads from '../../assets/Icons/downloads.svg'
import bellIcon from '../../assets/Icons/bellIcon.svg'
import logoutIcon from '../../assets/Icons/logoutIcon.svg'
import Search from '../search/search.jsx';

export default function Header({
    onSearchChange
}) {

  return (
   <div className='plms-header'>
       <div style={{width: '40%'}}>
        <Search
            placeholder={'Search Leads'}
            onChange={onSearchChange}
        />
       </div>
        <div className='header-content'>
            <img src={userIcon} />
            <img src={draftIcon} />
            <img src={downloads} />
            <img src={bellIcon} />
            <div className='logout-container'>
                <img src={logoutIcon} />
                <span className='logout-text'>Log Out</span>
            </div>
        </div>
   </div>
  )
}



