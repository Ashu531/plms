import React,{useEffect, useState} from 'react'
import './header.css'
import searchIcon from '../../assets/Icons/searchIcon.svg'
import userIcon from '../../assets/Icons/userIcon.svg'
import draftIcon from '../../assets/Icons/draftIcon.svg'
import downloads from '../../assets/Icons/downloads.svg'
import bellIcon from '../../assets/Icons/bellIcon.svg'
import logoutIcon from '../../assets/Icons/logoutIcon.svg'

export default function Button() {

  return (
   <div className='plms-header'>
        <div className='searchbar'>
            <img src={searchIcon} />
            <div className='search-placeholder'>
                Search for Leads
            </div>
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



