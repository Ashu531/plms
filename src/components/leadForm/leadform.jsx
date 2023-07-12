import React,{useEffect, useState} from 'react';
import './leadform.css';
import caretIcon from '../../assets/Icons/caretIcon.svg';
import LoanDetailsForm, { loanFormInputTypes } from '../../forms/loanDetails.jsx';
import LeadDetailForm,{createLeadFormState, formViewTypes, studentFormInputTypes} from '../../forms/leadDetails.jsx';
import Button from '../button/button.jsx';
import { amountValidation, basicValidation, emailValidation, mobileValidation } from '../../helpers/validations.js';

export default function LeadForm({
    onBackPress,
    instituteName
}) {

    const defaultState = {
        value: '',
        error: null,
        disabled: false
    };

    const defaultNameState = {
        ...defaultState,
        sameAsStudent: false
    }

    const defaultDropdownState = {
        value: -1,
        error: null
    }

    const [leadIdState, setLeadIdState] = useState({...defaultState});
    const [nameState, setNameState] = useState({...defaultState});
    const [instituteState, setInstituteState] = useState({...defaultState});
    const [mobileState, setMobileState] = useState({...defaultState});
    const [emailState, setEmailState] = useState({...defaultState});
    const [borrowerNameState, setBorrowerNameState] = useState({...defaultNameState});
    const [courseState, setCourseState] = useState({...defaultState});
    const [courseFeeState, setCourseFeeState] = useState({...defaultState});
    const [loanAmountState, setLoanAmountState] = useState({...defaultState});
    const [tenureState, setTenureState] = useState({...defaultDropdownState});
    const [advanceEmiState, setAdvanceEmiState] = useState({...defaultDropdownState});


    const handleLeadIdChange = (str) => {
        setLeadIdState({...leadIdState, value: str});
    };
    
    const handleNameChange = (str) => {
        setNameState({...nameState, value: str});
    };

    const handleInstituteChange = (str) => {
        setInstituteState({...instituteState, value: str});
    };

    const handleMobileChange = (str) => {
        setMobileState({...mobileState, value: str});
    };

    const handleEmailChange = (str) => {
        setEmailState({...emailState, value: str});
    };

    const onLeadFormChange = (type, str) => {
        switch(type){
            case studentFormInputTypes.leadId: return handleLeadIdChange(str);
            case studentFormInputTypes.name: return handleNameChange(str);
            case studentFormInputTypes.institute: return handleInstituteChange(str);
            case studentFormInputTypes.mobile: return handleMobileChange(str);
            case studentFormInputTypes.email: return handleEmailChange(str);
        }
    }

    const handleBorrowerNameChange = (changeType, str, checked) => {
        switch(changeType){
            case 0: return setBorrowerNameState({...borrowerNameState, value: str});
            case 1: return setBorrowerNameState({...borrowerNameState, sameAsStudent: checked});
            case 2: return setBorrowerNameState({...borrowerNameState, value: str, sameAsStudent: checked});
        }
            
    };
    
    const handleCourseChange = (str) => {
        setCourseState({...courseState, value: str});
    };

    const handleCourseFeeChange = (str) => {
        setCourseFeeState({...courseFeeState, value: str});
    };

    const handleLoanAmountChange = (str) => {
        setLoanAmountState({...loanAmountState, value: str});
    };

    const handleTenureChange = (str) => {
        setTenureState({...tenureState, value: str});
    };

    const handleAdvanceEmiChange = (str) => {
        setAdvanceEmiState({...advanceEmiState, value: str});
    };

    const onLoanFormChange = (type, str, checked, changeType) => {
        switch(type){
            case loanFormInputTypes.name: return handleBorrowerNameChange(changeType, str, checked);
            case loanFormInputTypes.course: return handleCourseChange(str);
            case loanFormInputTypes.courseFee: return handleCourseFeeChange(str);
            case loanFormInputTypes.loanAmount: return handleLoanAmountChange(str);
            case loanFormInputTypes.tenure: return handleTenureChange(str);
            case loanFormInputTypes.advanceEmi: return handleAdvanceEmiChange(str);
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(leadIdState.value);
            if(error != 'cannot be empty'){
                setLeadIdState({...leadIdState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [leadIdState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(nameState.value);
            if(error != 'cannot be empty'){
                setNameState({...nameState, error: error});
            }

            if(borrowerNameState.sameAsStudent == true){
                setBorrowerNameState({...borrowerNameState, value: nameState.value});
            }

        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [nameState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(instituteState.value);
            if(error != 'cannot be empty'){
                setInstituteState({...instituteState, error: error});
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [instituteState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = mobileValidation(mobileState.value);
            if(error != 'cannot be empty'){
                setMobileState({...mobileState, error: error});
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [mobileState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = emailValidation(emailState.value);
            if(error != 'cannot be empty'){
                setEmailState({...emailState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [emailState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(borrowerNameState.value);
            if(error != 'cannot be empty'){
                setBorrowerNameState({...borrowerNameState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [borrowerNameState.value]);

    useEffect(() => {
        if(borrowerNameState.sameAsStudent){
            setBorrowerNameState({...borrowerNameState, value: nameState.value})
        }
    }, [borrowerNameState.sameAsStudent]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(courseState.value);
            if(error != 'cannot be empty'){
                setCourseState({...courseState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [courseState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = amountValidation(courseFeeState.value);
            if(error != 'cannot be empty'){
                setCourseFeeState({...courseFeeState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [courseFeeState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = amountValidation(loanAmountState.value);
            if(error != 'cannot be empty'){
                setLoanAmountState({...loanAmountState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [loanAmountState.value]);

    // useEffect(() => {
    //     const delayDebounce = setTimeout(() => {
    //         const error = amountValidation(tenureState.value);
    //         if(error != 'cannot be empty'){
    //             setTenureState({...tenureState, error: error})
    //         }
    //     }, 0)
    
    //     return () => clearTimeout(delayDebounce)
    // }, [tenureState.value]);

    // useEffect(() => {
    //     const delayDebounce = setTimeout(() => {
    //         const error = amountValidation(advanceEmiState.value);
    //         if(error != 'cannot be empty'){
    //             setAdvanceEmiState({...advanceEmiState, error: error})
    //         }
    //     }, 0)
    
    //     return () => clearTimeout(delayDebounce)
    // }, [advanceEmiState.value]);


    const initForm = () => {
        setInstituteState({...instituteState, value: instituteName, disabled: true});
    }

    useEffect(() => {
        initForm();
    }, [])

  return (
   <div className='lead-form-modal'>
       <div className='lead-form-modal-content'>
                <div className='lead-form-modal-header row full-width-modal'>
                    <div className='row'>
                        <img src={caretIcon} onClick={onBackPress} style={{cursor:'pointer'}} />
                        <span className='lead-modal-header'>Lead Creation</span>
                    </div>
                    <div className='column' style={{alignItems:'flex-end'}}>
                        <span className='lead-modal-instructions' style={{justifyContent:'flex-start'}}>*Mandatory Fields<br/>**You must fill all mandatory fields to save a lead</span>
                    </div>
                </div>
                <div 
                    className='row full-width' 
                    style={{
                        flexWrap: 'wrap', 
                        gap: '20px', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        marginTop: '1rem',
                        overflow: 'scroll'
                    }}>
                     <div style={{flex: '1 1 0px'}}>
                        <LeadDetailForm
                            viewType={formViewTypes.CREATE} 
                            leadIdState={leadIdState}
                            nameState={nameState}
                            instituteState={instituteState}
                            mobileState={mobileState}
                            emailState={emailState}
                            onChange={onLeadFormChange}
                        />
                    </div>
                    <div style={{flex: '1 1 0px'}}>
                        <LoanDetailsForm
                            viewType={formViewTypes.CREATE} 
                            borrowerNameState={borrowerNameState}
                            courseState={courseState}
                            courseFeeState={courseFeeState}
                            loanAmountState={loanAmountState}
                            tenureState={tenureState}
                            advanceEmiState={advanceEmiState}
                            onChange={onLoanFormChange}
                        />
                    </div>
                </div>
                <div className='lead-form-modal-footer row full-width-modal'>
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
   </div>
  )
}



