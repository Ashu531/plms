import React,{useEffect, useRef, useState} from 'react';
import './leadform.css';
import caretIcon from '../../assets/Icons/caretIcon.svg';
import editIcon from '../../assets/Icons/editIcon.svg';
import LoanDetailsForm, { loanFormInputTypes } from '../../forms/loanDetails.jsx';
import LeadDetailForm,{formViewTypes, studentFormInputTypes} from '../../forms/leadDetails.jsx';
import Button from '../button/button.jsx';
import { amountValidation, basicValidation, emailValidation, mobileValidation } from '../../helpers/validations.js';
import Lead from '../../entities/formDetails.js';

export default function LeadForm({
    onBackPress,
    instituteName
}) {

    const formData = useRef(new Lead('', '', '', '', '', '', '', '', '', '-1', '-1'));

    const handleSave = () => {
        console.log('form data', formData.current.toJson());
    }

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

                <EditableLeadForm 
                    instituteName={instituteName}
                    viewType={formViewTypes.CREATE}
                    formData={formData.current}
                />

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
                        onClick={()=>{}}
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
                        onClick={()=>{}}
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
                        onClick={handleSave}
                    />
                </div>
       </div>
   </div>
  )
}

export function EditableLeadForm ({
    instituteName,
    formData,
    viewType,
    showHeadings=false,
    handleSave
}) {

    const newFormData = useRef();

    const [viewTypes, setViewTypes] = useState({
        lead: viewType,
        loan: viewType
    })

    const [editingStates, setEditingStates] = useState({
        lead: viewType != formViewTypes.VIEW,
        loan: viewType != formViewTypes.VIEW
    })

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

    const setInitialLeadFormStates = () => {
        handleLeadIdChange(newFormData.current.leadId);
        handleNameChange(newFormData.current.studentName);
        handleInstituteChange(newFormData.current.institute);
        handleMobileChange(newFormData.current.mobile);
        handleEmailChange(newFormData.current.email);
    }

    const setInitialLoanFormStates = () => {
        handleBorrowerNameChange(2, newFormData.current.borrowerName, newFormData.current.studentName == newFormData.current.borrowerName);
        handleCourseChange(newFormData.current.course);
        handleCourseFeeChange(newFormData.current.courseFee);
        handleLoanAmountChange(newFormData.current.loanAmount);
        handleTenureChange(newFormData.current.tenure);
        handleAdvanceEmiChange(newFormData.current.advanceEmi);
    }

    const setInitialFilledStates = () => {
        setInitialLeadFormStates();
        setInitialLoanFormStates();
    }

    const discardChanges = (formType) => {
        if(formType == 0){
            setInitialLeadFormStates();
            setEditingStates({...editingStates, lead: false});
        }

        else if(formType == 1){
            setInitialLoanFormStates();
            setEditingStates({...editingStates, loan: false});
        }

        else {
            throw `incorrect form type, available options are 0, 1 but ${formType} was passed`;
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(leadIdState.value);
            if(error != 'cannot be empty'){
                setLeadIdState({...leadIdState, error: error})
            }

            if(error == null){
                formData.leadId = leadIdState.value;
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

            if(error == null){
                formData.studentName = nameState.value;
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

            if(error == null){
                formData.institute = instituteState.value;
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

            if(error == null){
                formData.mobile = mobileState.value;
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

            if(error == null){
                formData.email = emailState.value;
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

            if(error == null){
                formData.borrowerName = borrowerNameState.value;
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

            if(error == null){
                formData.course = courseState.value;
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

            if(error == null){
                formData.courseFee = courseFeeState.value;
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

            if(error == null){
                formData.loanAmount = loanAmountState.value;
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

    useEffect(() => {
        if(editingStates.lead == true){
            setViewTypes({...viewTypes, lead: formViewTypes.EDIT})
        } else {
            setViewTypes({...viewTypes, lead: formViewTypes.VIEW})
        }
    }, [editingStates.lead])

    useEffect(() => {
        if(editingStates.loan == true){
            setViewTypes({...viewTypes, loan: formViewTypes.EDIT})
        } else {
            setViewTypes({...viewTypes, loan: formViewTypes.VIEW})
        }
    }, [editingStates.loan])

    const initForm = () => {
        if(viewType == formViewTypes.CREATE && instituteName != null){
            setInstituteState({...instituteState, value: instituteName, disabled: true});
        }

        if(formData != null) {
            console.log(
                formData.leadId,
                formData.studentName,
                formData.institute,
                formData.mobile,
                formData.email,
                formData.borrowerName,
                formData.course,
                formData.courseFee,
                formData.loanAmount,
                formData.tenure,
                formData.advanceEmi
            )
            newFormData.current = new Lead(
                formData.leadId,
                formData.studentName,
                formData.institute,
                formData.mobile,
                formData.email,
                formData.borrowerName,
                formData.course,
                formData.courseFee,
                formData.loanAmount,
                formData.tenure,
                formData.advanceEmi
            );
            setInitialFilledStates()
        }
    }

    useEffect(() => {
        initForm();
    }, [])

    return (
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
                {showHeadings && 
                    <div className='row' style={{justifyContent: 'space-between', alignItems: 'center', padding: '0 0 20px 0'}}>
                        <div className='text-montserrat text-weight-6 text-20 form-heading'>Student Details</div>
                        {!editingStates.lead && <img src={editIcon} onClick={() => setEditingStates({...editingStates, lead: true})}/>}
                        {editingStates.lead && 
                            <div className='row clickable-heading' style={{justifyContent: 'flex-end', gap: '25px', alignItems: 'baseline'}}>
                                <div className='clickable-text text-montserrat text-weight-6 text-16' onClick={() => discardChanges(0)}>Discard Changes</div>
                                <div className='clickable-text text-montserrat text-weight-6 text-16'>Save</div>
                            </div>
                        }
                    </div>
                }
                <LeadDetailForm
                    viewType={viewTypes.lead} 
                    leadIdState={leadIdState}
                    nameState={nameState}
                    instituteState={instituteState}
                    mobileState={mobileState}
                    emailState={emailState}
                    onChange={onLeadFormChange}
                />
            </div>
            <div style={{flex: '1 1 0px'}}>
                {showHeadings && 
                    <div className='row' style={{justifyContent: 'space-between', alignItems: 'center', padding: '0 0 30px 0'}}>
                        <div className='text-montserrat text-weight-6 text-20 form-heading'>Loan Details</div>
                        {!editingStates.loan && <img src={editIcon} onClick={() => setEditingStates({...editingStates, loan: true})}/>}
                        {editingStates.loan && 
                            <div className='row clickable-heading' style={{justifyContent: 'flex-end', gap: '25px', alignItems: 'baseline'}}>
                                <div className='clickable-text text-montserrat text-weight-6 text-16' onClick={() => discardChanges(1)}>Discard Changes</div>
                                <div className='clickable-text text-montserrat text-weight-6 text-16'>Save</div>
                            </div>
                        }
                    </div>
                }
                <LoanDetailsForm
                    viewType={viewTypes.loan} 
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
    );
}



