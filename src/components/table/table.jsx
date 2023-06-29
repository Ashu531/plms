import React,{useEffect, useState} from 'react'
import sortIcon from '../../assets/Icons/sortIcon.svg'
import './table.css'

export default function Table(props){

    const handleNavigation=()=>{
        let i = 1;
        props?.goToDetailPage(i)
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='header-text'>
                    Lead ID
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div>
                <div className='header-text' style={{width:'22%'}}>
                    Applicant
                </div>
                <div className='header-text'>
                    Mobile
                </div>
                <div className='header-text'>
                    Amount
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div>
                <div className='header-text' style={{width:'20%'}}>
                    Last Update
                </div>
                <div className='header-text' style={{width:'22%'}}>
                    Time of Update
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div>
            </div>
            <div className='table-row-container'>
                <div className='table-row'>
                    <div className='row-text' onClick={()=>props.openSlidingPanel()}>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}} onClick={()=>props.openSlidingPanel()}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text' onClick={()=>props.openSlidingPanel()}> 
                        9999888866
                    </div>
                    <div className='row-text' onClick={()=>props.openSlidingPanel()}>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}} onClick={()=>props.openSlidingPanel()}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}} onClick={()=>props.openSlidingPanel()}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container' onClick={()=>handleNavigation()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
                <div className='table-row'>
                    <div className='row-text'>
                        255194
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Rashmi Ranjan Satapathy
                    </div>
                    <div className='row-text'>
                        9999888866
                    </div>
                    <div className='row-text'>
                        ₹ 46,000
                    </div>
                    <div className='row-text' style={{width:'20%'}}>
                        Consent Pending
                    </div>
                    <div className='row-text' style={{width:'22%'}}>
                        Thursday, March 31 2022 10:40:10 PM
                    </div>
                    <div className='icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0b090d" viewBox="0 0 256 256"><path d="M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"></path></svg>
                    </div>
                </div>
            </div>
            
        </div>
          
  )
}



