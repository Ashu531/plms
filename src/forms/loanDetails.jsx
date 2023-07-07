import React, { useEffect, useState } from 'react';
import { Dropdown } from '../components/dropdown/dropdown.jsx';
import { Input } from '../components/input/input.jsx';
import { formViewTypes } from './leadDetails.jsx';
import inrIcon from '../assets/Icons/inrIcon.svg';
import { amountValidation, basicValidation, emailValidation, mobileValidation } from '../helpers/validations.js';


export const createLoanFormState = {
    name: '',
    course: '',
    courseFee: '',
    loanAmount: '',
    tenure: '',
    advanceEmi: ''
}

export default function LoanDetailsForm({
    viewType,
    prefilledFields=[],
    formData,
}) {

    const defaultState = {
        value: '',
        error: null
    };

    const defaultNameState = {
        ...defaultState,
        sameAsStudent: false
    }

    const defaultDropdownState = {
        value: -1,
        error: null
    }

    const [nameState, setNameState] = useState({...defaultNameState});
    const [courseState, setCourseState] = useState({...defaultState});
    const [courseFeeState, setCourseFeeState] = useState({...defaultState});
    const [loanAmountState, setLoanAmountState] = useState({...defaultState});
    const [tenureState, setTenureState] = useState({...defaultDropdownState});
    const [advanceEmiState, setAdvanceEmiState] = useState({...defaultDropdownState});

    const nameLabel = () => 'Borrower Name';
    const courseLabel = () => 'Course';
    const courseFeeLabel = () => 'course Fee';
    const loanAmountLabel = () => 'Loan Amount';
    const tenureLabel = () => 'Tenure (in months)';
    const advanceEmiLabel = () => 'Advance EMI'

    const getLabel = (type) => {
        
        switch(type){
            case loanFormInputTypes.name: return nameLabel();
            case loanFormInputTypes.course: return courseLabel();
            case loanFormInputTypes.courseFee: return courseFeeLabel();
            case loanFormInputTypes.loanAmount: return loanAmountLabel();
            case loanFormInputTypes.tenure: return tenureLabel();
            case loanFormInputTypes.advanceEmi: return advanceEmiLabel();
        }
        
    }


    const nameRequired = () => viewType == formViewTypes.CREATE;
    const courseRequired = () => viewType == formViewTypes.CREATE;
    const courseFeeRequired = () => viewType == formViewTypes.CREATE;
    const loanAmountRequired = () => viewType == formViewTypes.CREATE;
    const tenureRequired = () => viewType == formViewTypes.CREATE;
    const advanceEmiRequired = () => viewType == formViewTypes.CREATE;

    const getRequired = (type) => {

        if(viewType == formViewTypes.CREATE){
            return true;
        }

        switch(type){
            case loanFormInputTypes.name: return nameRequired();
            case loanFormInputTypes.course: return courseRequired();
            case loanFormInputTypes.courseFee: return courseFeeRequired();
            case loanFormInputTypes.loanAmount: return loanAmountRequired();
            case loanFormInputTypes.tenure: return tenureRequired();
            case loanFormInputTypes.advanceEmi: return advanceEmiRequired();
        }

    }


    const nameCheck = () => false;
    const courseCheck = () => false;
    const courseFeeCheck = () => false;
    const loanAmountCheck = () => false;
    const tenureCheck = () => false;
    const advanceEmiCheck = () => false;

    const getCheck = (type) => {
        switch(type){
            case loanFormInputTypes.name: return nameCheck();
            case loanFormInputTypes.course: return courseCheck();
            case loanFormInputTypes.courseFee: return courseFeeCheck();
            case loanFormInputTypes.loanAmount: return loanAmountCheck();
            case loanFormInputTypes.tenure: return tenureCheck();
            case loanFormInputTypes.advanceEmi: return advanceEmiCheck();
        }
    }


    const namePlaceholder = () => '';
    const coursePlaceholder = () => '';
    const courseFeePlaceholder = () => '';
    const loanAmountPlaceholder = () => '';
    const tenurePlaceholder = () => '-Select-';
    const advanceEmiPlaceholder = () => '-Select-';
    
    const getPlaceholder = (type) => {
        switch(type){
            case loanFormInputTypes.name: return namePlaceholder();
            case loanFormInputTypes.course: return coursePlaceholder();
            case loanFormInputTypes.courseFee: return courseFeePlaceholder();
            case loanFormInputTypes.loanAmount: return loanAmountPlaceholder();
            case loanFormInputTypes.tenure: return tenurePlaceholder();
            case loanFormInputTypes.advanceEmi: return advanceEmiPlaceholder();
        }
    }

    const getValue = (type) => {
        switch(type){
            case loanFormInputTypes.name: return nameState.value;
            case loanFormInputTypes.course: return courseState.value;
            case loanFormInputTypes.courseFee: return courseFeeState.value;
            case loanFormInputTypes.loanAmount: return loanAmountState.value;
            case loanFormInputTypes.tenure: return tenureState.value;
            case loanFormInputTypes.advanceEmi: return advanceEmiState.value;
        }
    }



    const handleNameChange = (changeType, str, checked) => {
        switch(changeType){
            case 0: return setNameState({...nameState, value: str});
            case 1: return setNameState({...nameState, sameAsStudent: checked});
            case 2: return setNameState({...nameState, value: str, sameAsStudent: checked});
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



    const onChange = (type, str, checked, changeType) => {
        switch(type){
            case loanFormInputTypes.name: return handleNameChange(changeType, str, checked);
            case loanFormInputTypes.course: return handleCourseChange(str);
            case loanFormInputTypes.courseFee: return handleCourseFeeChange(str);
            case loanFormInputTypes.loanAmount: return handleLoanAmountChange(str);
            case loanFormInputTypes.tenure: return handleTenureChange(str);
            case loanFormInputTypes.advanceEmi: return handleAdvanceEmiChange(str);
        }
    }


    const nameDisabled = () => prefilledFields.indexOf(loanFormInputTypes.name) > -1;
    const courseDisabled = () => prefilledFields.indexOf(loanFormInputTypes.course) > -1;
    const courseFeeDisabled = () => prefilledFields.indexOf(loanFormInputTypes.courseFee) > -1;
    const loanAmountDisabled = () => prefilledFields.indexOf(loanFormInputTypes.loanAmount) > -1;
    const tenureDisabled = () => prefilledFields.indexOf(loanFormInputTypes.tenure) > -1;
    const advanceEmiDisabled = () => prefilledFields.indexOf(loanFormInputTypes.advanceEmi) > -1;

    const getDisabled = (type) => {

        if(viewType == formViewTypes.VIEW){
            return true;
        }

        switch(type){
            case loanFormInputTypes.name: return nameDisabled();
            case loanFormInputTypes.course: return courseDisabled();
            case loanFormInputTypes.courseFee: return courseFeeDisabled();
            case loanFormInputTypes.loanAmount: return loanAmountDisabled();
            case loanFormInputTypes.tenure: return tenureDisabled();
            case loanFormInputTypes.advanceEmi: return advanceEmiDisabled();
        }

    }

    const getError = (type) => {

        switch(type){
            case loanFormInputTypes.name: return nameState.error;
            case loanFormInputTypes.course: return courseState.error;
            case loanFormInputTypes.courseFee: return courseFeeState.error;
            case loanFormInputTypes.loanAmount: return loanAmountState.error;
            case loanFormInputTypes.tenure: return tenureState.error;
            case loanFormInputTypes.advanceEmi: return advanceEmiState.error;
        }

    }

    const getType = (type) => {

        switch(type){
            case loanFormInputTypes.name: return "text";
            case loanFormInputTypes.course: return "text";
            case loanFormInputTypes.courseFee: return "number";
            case loanFormInputTypes.loanAmount: return "number";
            case loanFormInputTypes.tenure: return "number";
            case loanFormInputTypes.advanceEmi: return "number";
        }

    }


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(nameState.value);
            if(error != 'cannot be empty'){
                setNameState({...nameState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [nameState.value]);

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


    useEffect(() => {

        if(formData != null){
            onChange(loanFormInputTypes.name, formData['name'] ? formData['name'] : '', formData['sameAsStudent'] == true, 2);
            onChange(loanFormInputTypes.course, formData['course'] ? formData['course'] : '');
            onChange(loanFormInputTypes.courseFee, formData['courseFee'] ? formData['courseFee'] : '');
            onChange(loanFormInputTypes.loanAmount, formData['loanAmount'] ? formData['loanAmount'] : '');
            onChange(loanFormInputTypes.tenure, formData['tenure'] ? formData['tenure'] : '');
            onChange(loanFormInputTypes.advanceEmi, formData['advanceEmi'] ? formData['advanceEmi'] : '');
        }

    }, []);


  return (
    <div className='column' style={{width: '100%', gap:'15px'}}>

        <Input
            label={getLabel(loanFormInputTypes.name)}
            required={getRequired(loanFormInputTypes.name)}
            showCheck={getCheck(loanFormInputTypes.name)}
            disabler={viewType != formViewTypes.VIEW}
            disablerLabel={'Same as Student'}
            disablerState={nameState.sameAsStudent}
            onDisablerStateChange={(value) => onChange(loanFormInputTypes.name, null, value, 1)}
            placeholder={getPlaceholder(loanFormInputTypes.name)}
            value={getValue(loanFormInputTypes.name)}
            onChange={(str) => onChange(loanFormInputTypes.name, str, null, 0)}
            disabled={getDisabled(loanFormInputTypes.name)}
            error={getError(loanFormInputTypes.name)}
            type={getType(loanFormInputTypes.name)}
        />
        
        <Input
            label={getLabel(loanFormInputTypes.course)}
            required={getRequired(loanFormInputTypes.course)}
            showCheck={getCheck(loanFormInputTypes.course)}
            placeholder={getPlaceholder(loanFormInputTypes.course)}
            value={getValue(loanFormInputTypes.course)}
            onChange={(str) => onChange(loanFormInputTypes.course, str)}
            disabled={getDisabled(loanFormInputTypes.course)}
            error={getError(loanFormInputTypes.course)}
            type={getType(loanFormInputTypes.course)}
        />

        <Input
            label={getLabel(loanFormInputTypes.courseFee)}
            required={getRequired(loanFormInputTypes.courseFee)}
            showCheck={getCheck(loanFormInputTypes.courseFee)}
            placeholder={getPlaceholder(loanFormInputTypes.courseFee)}
            leadingText={'₹'}
            value={getValue(loanFormInputTypes.courseFee)}
            onChange={(str) => onChange(loanFormInputTypes.courseFee, str)}
            disabled={getDisabled(loanFormInputTypes.courseFee)}
            error={getError(loanFormInputTypes.courseFee)}
            type={getType(loanFormInputTypes.courseFee)}
        />

        <Input
            label={getLabel(loanFormInputTypes.loanAmount)}
            required={getRequired(loanFormInputTypes.loanAmount)}
            showCheck={getCheck(loanFormInputTypes.loanAmount)}
            placeholder={getPlaceholder(loanFormInputTypes.loanAmount)}
            leadingText={'₹'}
            value={getValue(loanFormInputTypes.loanAmount)}
            onChange={(str) => onChange(loanFormInputTypes.loanAmount, str)}
            disabled={getDisabled(loanFormInputTypes.loanAmount)}
            error={getError(loanFormInputTypes.loanAmount)}
            type={getType(loanFormInputTypes.loanAmount)}
        />

        <Dropdown 
            label={getLabel(loanFormInputTypes.tenure)}
            required={getRequired(loanFormInputTypes.tenure)}
            showCheck={getCheck(loanFormInputTypes.tenure)}
            placeholder={getPlaceholder(loanFormInputTypes.tenure)}
            value={getValue(loanFormInputTypes.tenure)}
            onChange={(str) => onChange(loanFormInputTypes.tenure, str)}
            disabled={getDisabled(loanFormInputTypes.tenure)}
            error={getError(loanFormInputTypes.tenure)}
        />

        <Dropdown 
            label={getLabel(loanFormInputTypes.advanceEmi)}
            required={getRequired(loanFormInputTypes.advanceEmi)}
            showCheck={getCheck(loanFormInputTypes.advanceEmi)}
            placeholder={getPlaceholder(loanFormInputTypes.advanceEmi)}
            value={getValue(loanFormInputTypes.advanceEmi)}
            onChange={(str) => onChange(loanFormInputTypes.advanceEmi, str)}
            disabled={getDisabled(loanFormInputTypes.advanceEmi)}
            error={getError(loanFormInputTypes.advanceEmi)}
        />

    </div>
  )
}


export const loanFormInputTypes = {
    name: 0,
    course: 1,
    courseFee: 2,
    loanAmount: 3,
    tenure: 4,
    advanceEmi: 5,
}