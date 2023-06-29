import React,{useEffect, useState} from 'react'
import caretIcon from '../../assets/Icons/caretIcon.svg'
import Button from '../button/button.jsx'
import './leadform.css'

export default function LeadForm() {

  return (
   <div className='lead-form-modal'>
       <div className='lead-form-modal-content'>
           <div className='lead-form-modal-container'>
                <div className='lead-form-modal-header row full-width-modal'>
                    <div className='row'>
                        <img src={caretIcon} />
                        <span className='lead-modal-header'>Lead Creation</span>
                    </div>
                    <div className='column'>
                        <span className='lead-modal-instructions' style={{justifyContent:'flex-start'}}>*Mandatory Fields<br/>**You must fill all mandatory fields to save a lead</span>
                    </div>
                </div>
                <div className='lead-form-modal-footer row full-width-modal'>
                    <Button
                        text='Save Draft'
                        classes={{
                            borderRadius: 8,
                            border: '1px solid #8F14CC',
                            height: '44px',
                            width: '150px',
                        }}
                        textClass={{
                            color: '#8F14CC',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: 600
                        }}
                    />
                    <Button 
                        text='Save & Add Another Lead'
                        classes={{
                            background: '#8F14CC',
                            borderRadius: '8px',
                            height: '44px',
                            width: '150px',
                        }}
                        textClass={{
                            color: '#FFF',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: 600
                        }}
                    />
                    <Button 
                        text='Save Lead'
                        classes={{
                            background: '#8F14CC',
                            borderRadius: '8px',
                            height: '44px',
                            width: '150px',
                        }}
                        textClass={{
                            color: '#FFF',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: 600
                        }}
                    />
                </div>
            </div>
       </div>
   </div>
  )
}



