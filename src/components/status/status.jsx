import React,{useEffect,useState} from 'react';
import './status.css';

export default function Status({
    lightText,
    boldText,
    onClick,
    selected,
    count
}) {

  return (
    <div 
        className={`status-container column ${selected ? 'selected' : ''}`}
        onClick={onClick}
    >
        <div className='text-12 text-montserrat text-capitalize'>{count} Cases</div>
        <div className='text-20 text-weight-5 text-montserrat text-capitalize'>{boldText}</div>
    </div>
  )
}
