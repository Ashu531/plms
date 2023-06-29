import React, { useEffect, useState } from 'react';
import pendingIcon from '../../assets/Icons/pendingIcon.svg'
import './documentCard.css';

export default function DocumentCard(props) {

  return (
    <div className='document-card-container'> 
        <div className='row'>
            <div className='document-card-header'>
                {props?.title}
            </div>
            <div className='pending-icon-content'>
                <img src={pendingIcon}/>
            </div>
        </div>
        <div className='column'>
            <div className='document-card-desc'>
                {props?.desc}
            </div>
            <div className='document-card-desc'>
                {props?.instruction}
            </div>
        </div>
        
    </div>
  )
}



