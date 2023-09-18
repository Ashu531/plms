import React,{useEffect, useState} from 'react'
import './header.css'
import caretIcon from '../../assets/Icons/caretIcon.svg'
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
    goToDownloads,
    goToHomePage,
    onDraftSearch,
    query,
    removeSearchQuery,
    draftCount
}) {

    const handleBack=()=>{
        let i = 0
        goToHomePage(i)
      }

  return (
   <div className='plms-navbar-header'>
       <div style={{width: 380}}>
           {
             screen === 0 && <Search
                placeholder={'Search for Leads'}
                onChange={onSearchChange}
                query={query}
                removeSearchQuery={()=>removeSearchQuery()}
            />
           }

            {/* {
             screen === 1 && <div className='header-title'>
                 Lead Detail
                 </div>
           } */}

            {
             screen === 2 && 
             <div className='row'>
                    <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                    <div className='header-title'>
                        Drafts
                    </div>   
             </div>
           } 

            {
             screen === 3 && 
             <div className='row' >
                <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                <div className='header-title'>
                    Downloads
                 </div>
             </div>    
           }
        
       </div>
        <div className='header-content'>
            {/* <img src={userIcon} style={{width: '36px', height: '36px'}} /> */}
            <div style={{position:'relative'}}>
                <img src={draftIcon} style={{width: '36px', height: '36px',cursor: 'pointer'}} onClick={()=>goToDraftPage()} />
                <div className='plms-draft-count-content'>
                            <div className='plms-draft-count-text'>
                                {draftCount}
                            </div>    
                </div> 
            </div>
            
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



