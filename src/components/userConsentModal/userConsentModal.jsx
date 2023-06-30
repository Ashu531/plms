import React,{useEffect, useState} from 'react'
import caretIcon from '../../assets/Icons/caretIcon.svg'
import LoanDetailsForm from '../../forms/loanDetails.jsx'
import StudentDetailForm,{formViewTypes} from '../../forms/studentDetails.jsx'
import userConsentIcon from '../../assets/Icons/userConsentIcon.svg'
import closeIcon from '../../assets/Icons/cross-icon.svg'
import Button from '../button/button.jsx'
import './/userConsentModal.css'

export default function UserConsentModal(props) {

  return (
   <div className='user-consent-modal'>
       <div className='user-consent-content'>
            <div className='column user-consent-container'>
                <div className='row' style={{justifyContent:'center'}}>
                    <img src={userConsentIcon} />
                    <div className='user-consent-header'>User Consent</div>
                </div>
                <div className='user-consent-instruction'>
                  User consent is required to pull user CRIF. Send SMS and email to user to ask for consent.
                </div>
                <div className='button-container'>
                    <Button 
                      text='Send Request'
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
                    />
                </div>
            </div>
            <div className='closeIcon' onClick={()=>props?.closeUserConsentModal()}>
                <img src={closeIcon} height={24} width={24} style={{objectFit:'contain'}} />
            </div>
       </div>
   </div>
  )
}



