import React,{useEffect, useState} from 'react';
import './leadform.css';
import caretIcon from '../../assets/Icons/caretIcon.svg';
import LoanDetailsForm, { createLoanFormState, loanFormInputTypes } from '../../forms/loanDetails.jsx';
import LeadDetailForm,{createLeadFormState, formViewTypes, studentFormInputTypes} from '../../forms/leadDetails.jsx';
import Button from '../button/button.jsx';

export default function LeadForm({
    instituteName
}) {

    const [ leadFormState, setLeadFormState ] = useState({ ...createLeadFormState });
    const [ loanFormState, setLoanFormState ] = useState({ ...createLoanFormState });


    const initForm = () => {
        let newLeadFormState = {...leadFormState};
        newLeadFormState.institute = instituteName;

        setLeadFormState({ ...newLeadFormState });
    }


    useEffect(() => {

        

    }, [leadFormState.name])

    useEffect(() => {
        initForm();
    }, [])

  return (
   <div className='lead-form-modal'>
       <div className='lead-form-modal-content'>
                <div className='lead-form-modal-header row full-width-modal'>
                    <div className='row'>
                        <img src={caretIcon} onClick={()=>props?.closeLeadModal()} style={{cursor:'pointer'}} />
                        <span className='lead-modal-header'>Lead Creation</span>
                    </div>
                    <div className='column' style={{alignItems:'flex-end'}}>
                        <span className='lead-modal-instructions' style={{justifyContent:'flex-start'}}>*Mandatory Fields<br/>**You must fill all mandatory fields to save a lead</span>
                    </div>
                </div>
                <div className='row full-width' style={{flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1rem'}}>
                     <div style={{width: '48%'}}>
                        <LeadDetailForm
                            viewType={formViewTypes.CREATE} 
                            prefilledFields={[studentFormInputTypes.institute]}
                            formData={{
                                institute: 'Some institute'
                            }}
                        />
                    </div>
                    <div style={{width: '48%'}}>
                        <LoanDetailsForm
                            viewType={formViewTypes.CREATE} 
                            formData={{}}
                        />
                    </div>
                </div>
                <div className='row' style={{gap: '1rem'}}>
                    <Button
                        text='Save Draft'
                        classes={{
                            borderRadius: 8,
                            border: '1px solid #8F14CC',
                            height: '44px'
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
                            height: '44px'
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
                            height: '44px'
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
  )
}



