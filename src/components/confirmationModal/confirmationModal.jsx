import React,{useEffect, useState} from 'react'
import userConsentIcon from '../../assets/Icons/userConsentIcon.svg'
import closeIcon from '../../assets/Icons/cross-icon.svg'
import Button from '../button/button.jsx'
import './/confirmationModal.css'

export default function ConfirmationModal(props) {

  return (
   <div className='confirmation-modal'>
       <div className='confirmation-content'>
            <div className='column confirmation-container'>
                <div className='row' style={{justifyContent:'center'}}>
                    <div className='confirmation-header'>{props?.title}</div>
                </div>
                <div className='confirmation-instruction'>
                  {props?.instruction}
                </div>
                <div className='confirmation-description'>
                  {props?.description}
                </div>
                <div className='confirmation-button-container'>
                    <Button 
                      text={props?.secondaryButtonText}
                      classes={{
                        borderRadius: 8,
                        border: '1px solid #8F14CC',
                        height: '44px',
                        width:'30%'
                      }}
                      textClass={{
                          color: '#8F14CC',
                          fontSize: '14px',
                          fontFamily: 'Montserrat',
                          fontWeight: 600
                      }}
                      onClick={()=>props?.closeConfirmationModal()}
                    />
                    <Button 
                      text={props?.primaryButtonText}
                      classes={{
                          background: '#8F14CC',
                          borderRadius: '8px',
                          height: '44px',
                          width: '150px',
                      }}
                      textClass={{
                          color: '#FFF',
                          fontSize: '16px',
                          fontFamily: 'Montserrat',
                          fontWeight: 500
                      }}
                      onClick={()=>props?.onDeleteDraft()}
                    />
                   
                </div>
            </div>
            <div className='confirmation-closeIcon' onClick={()=>props?.closeConfirmationModal()}>
                <img src={closeIcon} height={24} width={24} style={{objectFit:'contain'}} />
            </div>
       </div>
   </div>
  )
}



