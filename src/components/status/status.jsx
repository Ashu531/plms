import React from 'react';
import './status.css';

export default function Status({
    lightText,
    boldText,
    bgColor,
    textColor
}) {

  return (
    <div className='status-container' style={{background: bgColor, color: textColor}}>
        <div>{lightText}</div>
        <div>{boldText}</div>
    </div>
  )
}
