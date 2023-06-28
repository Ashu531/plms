import React,{useEffect,useState} from 'react';
import './status.css';

export default function Status({
    lightText,
    boldText,
    bgColor,
    textColor,
    style={},
    onClick
}) {

  return (
    <div 
        className={`status-container column`} 
        style={{background: bgColor, color: textColor, ...style}} 
        onClick={onClick}
    >
        <div className='text-12 text-montserrat text-capitalize'>{lightText}</div>
        <div className='text-20 text-weight-5 text-montserrat text-capitalize'>{boldText}</div>
    </div>
  )
}
