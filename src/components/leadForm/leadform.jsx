import React,{useEffect, useState} from 'react'
import caretIcon from '../../assets/Icons/caretIcon.svg'
import LoanDetailsForm from '../../forms/loanDetails.jsx'
import StudentDetailForm,{formViewTypes} from '../../forms/studentDetails.jsx'
import Button from '../button/button.jsx'
import './leadform.css'

export default function LeadForm(props) {

  return (
   <div className='lead-form-modal'>
       <div className='lead-form-modal-content'>
           <div className='lead-form-modal-container'>
                <div className='lead-form-modal-header row full-width-modal'>
                    <div className='row'>
                        <img src={caretIcon} onClick={()=>props?.closeLeadModal()} style={{cursor:'pointer'}} />
                        <span className='lead-modal-header'>Lead Creation</span>
                    </div>
                    <div className='column' style={{alignItems:'flex-end'}}>
                        <span className='lead-modal-instructions' style={{justifyContent:'flex-start'}}>*Mandatory Fields<br/>**You must fill all mandatory fields to save a lead</span>
                    </div>
                </div>
                <div className='row full-width' style={{flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-start',marginTop: '3rem'}}>
                     <div style={{width: '40%'}}>
                        <StudentDetailForm
                            viewType={formViewTypes.CREATE} 
                            formData={{
                                leadId: '327669',
                                name: 'Rashmi Ranjan Sathapathy',
                                institute: 'Skill Lync',
                                mobile: '9040146344',
                                email: 'rrsatzat@gmail.com'
                            }}
                        />
                    </div>
                    <div style={{width: '40%'}}>
                        <LoanDetailsForm
                            viewType={formViewTypes.CREATE} 
                            formData={{
                                name: 'Rashmi Ranjan Sathapathy',
                                sameAsStudent: false,
                                course: 'Embedded Software Development',
                                courseFee: '59000',
                                loanAmount: '55000',
                                tenure: -1,
                                advanceEmi: -1
                            }}
                        />
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



