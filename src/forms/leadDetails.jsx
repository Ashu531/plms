import React, { useEffect, useState } from 'react';
import { Input } from '../components/input/input.jsx';
import { basicValidation, emailValidation, mobileValidation } from '../helpers/validations.js';


export const createLeadFormState = {
    leadId: '',
    name: '',
    institute: '',
    mobile: '',
    email: ''
}

export default function LeadDetailForm({
    viewType,
    prefilledFields=[],
    formData
}) {

    const defaultState = {
        value: '',
        error: null
    };

    const [leadIdState, setLeadIdState] = useState({...defaultState});
    const [nameState, setNameState] = useState({...defaultState});
    const [instituteState, setInstituteState] = useState({...defaultState});
    const [mobileState, setMobileState] = useState({...defaultState});
    const [emailState, setEmailState] = useState({...defaultState});

    const leadIdLabel = () => 'Lead ID';
    const nameLabel = () => 'Student Name';
    const instituteLabel = () => 'Institute';
    const mobileLabel = () => 'Mobile';
    const emailLabel = () => 'Email';

    const getLabel = (type) => {
        
        switch(type){
            case studentFormInputTypes.leadId: return leadIdLabel();
            case studentFormInputTypes.name: return nameLabel();
            case studentFormInputTypes.institute: return instituteLabel();
            case studentFormInputTypes.mobile: return mobileLabel();
            case studentFormInputTypes.email: return emailLabel();
        }
        
    }


    const leadIdRequired = () => viewType == formViewTypes.CREATE;
    const nameRequired = () => viewType == formViewTypes.CREATE;
    const instituteRequired = () => viewType == formViewTypes.CREATE;
    const mobileRequired = () => viewType == formViewTypes.CREATE;
    const emailRequired = () => viewType == formViewTypes.CREATE;

    const getRequired = (type) => {

        switch(type){
            case studentFormInputTypes.leadId: return leadIdRequired();
            case studentFormInputTypes.name: return nameRequired();
            case studentFormInputTypes.institute: return instituteRequired();
            case studentFormInputTypes.mobile: return mobileRequired();
            case studentFormInputTypes.email: return emailRequired();
        }

    }


    const leadIdCheck = () => false;
    const nameCheck = () => false;
    const instituteCheck = () => false;
    const mobileCheck = () => false;
    const emailCheck = () => false;

    const getCheck = (type) => {
        switch(type){
            case studentFormInputTypes.leadId: return leadIdCheck();
            case studentFormInputTypes.name: return nameCheck();
            case studentFormInputTypes.institute: return instituteCheck();
            case studentFormInputTypes.mobile: return mobileCheck();
            case studentFormInputTypes.email: return emailCheck();
        }
    }


    const leadIdPlaceholder = () => '';
    const namePlaceholder = () => '';
    const institutePlaceholder = () => '';
    const mobilePlaceholder = () => '';
    const emailPlaceholder = () => '';
    
    const getPlaceholder = (type) => {
        switch(type){
            case studentFormInputTypes.leadId: return leadIdPlaceholder();
            case studentFormInputTypes.name: return namePlaceholder();
            case studentFormInputTypes.institute: return institutePlaceholder();
            case studentFormInputTypes.mobile: return mobilePlaceholder();
            case studentFormInputTypes.email: return emailPlaceholder();
        }
    }

    const getValue = (type) => {
        switch(type){
            case studentFormInputTypes.leadId: return leadIdState.value;
            case studentFormInputTypes.name: return nameState.value;
            case studentFormInputTypes.institute: return instituteState.value;
            case studentFormInputTypes.mobile: return mobileState.value;
            case studentFormInputTypes.email: return emailState.value;
        }
    }



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

    const onChange = (type, str) => {
        switch(type){
            case studentFormInputTypes.leadId: return handleLeadIdChange(str);
            case studentFormInputTypes.name: return handleNameChange(str);
            case studentFormInputTypes.institute: return handleInstituteChange(str);
            case studentFormInputTypes.mobile: return handleMobileChange(str);
            case studentFormInputTypes.email: return handleEmailChange(str);
        }
    }



    const leadIdDisabled = () => prefilledFields.indexOf(studentFormInputTypes.leadId) > -1;
    const nameDisabled = () => prefilledFields.indexOf(studentFormInputTypes.name) > -1;
    const instituteDisabled = () => prefilledFields.indexOf(studentFormInputTypes.institute) > -1;
    const mobileDisabled = () => prefilledFields.indexOf(studentFormInputTypes.mobile) > -1;
    const emailDisabled = () => prefilledFields.indexOf(studentFormInputTypes.email) > -1;

    const getDisabled = (type) => {

        if(viewType == formViewTypes.VIEW){
            return true;
        }

        switch(type){
            case studentFormInputTypes.leadId: return leadIdDisabled();
            case studentFormInputTypes.name: return nameDisabled();
            case studentFormInputTypes.institute: return instituteDisabled();
            case studentFormInputTypes.mobile: return mobileDisabled();
            case studentFormInputTypes.email: return emailDisabled();
        }

    }

    const getError = (type) => {

        switch(type){
            case studentFormInputTypes.leadId: return leadIdState.error;
            case studentFormInputTypes.name: return nameState.error;
            case studentFormInputTypes.institute: return instituteState.error;
            case studentFormInputTypes.mobile: return mobileState.error;
            case studentFormInputTypes.email: return emailState.error;
        }

    }

    const getType = (type) => {

        switch(type){
            case studentFormInputTypes.leadId: return "text";
            case studentFormInputTypes.name: return "text";
            case studentFormInputTypes.institute: return "text";
            case studentFormInputTypes.mobile: return "number";
            case studentFormInputTypes.email: return "text";
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
                setNameState({...nameState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [nameState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = basicValidation(instituteState.value);
            if(error != 'cannot be empty'){
                setInstituteState({...instituteState, error: error})
            }
        }, 0)
    
        return () => clearTimeout(delayDebounce)
    }, [instituteState.value]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const error = mobileValidation(mobileState.value);
            if(error != 'cannot be empty'){
                setMobileState({...mobileState, error: error})
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

        if(formData != null){
            onChange(studentFormInputTypes.leadId, formData['leadId'] ? formData['leadId'] : '');
            onChange(studentFormInputTypes.name, formData['name'] ? formData['name'] : '');
            onChange(studentFormInputTypes.institute, formData['institute'] ? formData['institute'] : '');
            onChange(studentFormInputTypes.mobile, formData['mobile'] ? formData['mobile'] : '');
            onChange(studentFormInputTypes.email, formData['email'] ? formData['email'] : '');

        }

    }, []);


  return (
    <div className='column' style={{width: '100%', gap:'15px'}}>
        
        <Input
            label={getLabel(studentFormInputTypes.leadId)}
            required={getRequired(studentFormInputTypes.leadId)}
            showCheck={getCheck(studentFormInputTypes.leadId)}
            placeholder={getPlaceholder(studentFormInputTypes.leadId)}
            value={getValue(studentFormInputTypes.leadId)}
            onChange={(str) => onChange(studentFormInputTypes.leadId, str)}
            disabled={getDisabled(studentFormInputTypes.leadId)}
            error={getError(studentFormInputTypes.leadId)}
            type={getType(studentFormInputTypes.leadId)}
        />

        <Input
            label={getLabel(studentFormInputTypes.name)}
            required={getRequired(studentFormInputTypes.name)}
            showCheck={getCheck(studentFormInputTypes.name)}
            placeholder={getPlaceholder(studentFormInputTypes.name)}
            value={getValue(studentFormInputTypes.name)}
            onChange={(str) => onChange(studentFormInputTypes.name, str)}
            disabled={getDisabled(studentFormInputTypes.name)}
            error={getError(studentFormInputTypes.name)}
            type={getType(studentFormInputTypes.name)}
        />

        <Input
            label={getLabel(studentFormInputTypes.institute)}
            required={getRequired(studentFormInputTypes.institute)}
            showCheck={getCheck(studentFormInputTypes.institute)}
            placeholder={getPlaceholder(studentFormInputTypes.institute)}
            value={getValue(studentFormInputTypes.institute)}
            onChange={(str) => onChange(studentFormInputTypes.institute, str)}
            disabled={getDisabled(studentFormInputTypes.institute)}
            error={getError(studentFormInputTypes.institute)}
            type={getType(studentFormInputTypes.institute)}
        />

        <Input
            label={getLabel(studentFormInputTypes.mobile)}
            required={getRequired(studentFormInputTypes.mobile)}
            showCheck={getCheck(studentFormInputTypes.mobile)}
            placeholder={getPlaceholder(studentFormInputTypes.mobile)}
            value={getValue(studentFormInputTypes.mobile)}
            onChange={(str) => onChange(studentFormInputTypes.mobile, str)}
            disabled={getDisabled(studentFormInputTypes.mobile)}
            error={getError(studentFormInputTypes.mobile)}
            type={getType(studentFormInputTypes.mobile)}
            maxLength={10}
        />

        <Input
            label={getLabel(studentFormInputTypes.email)}
            required={getRequired(studentFormInputTypes.email)}
            showCheck={getCheck(studentFormInputTypes.email)}
            placeholder={getPlaceholder(studentFormInputTypes.email)}
            value={getValue(studentFormInputTypes.email)}
            onChange={(str) => onChange(studentFormInputTypes.email, str)}
            disabled={getDisabled(studentFormInputTypes.email)}
            error={getError(studentFormInputTypes.email)}
            type={getType(studentFormInputTypes.email)}
        />

    </div>
  )
}


export const studentFormInputTypes = {
    leadId: 0,
    name: 1,
    institute: 2,
    mobile: 3,
    email: 4
}

export const formViewTypes = {
    CREATE: 0,
    EDIT: 1,
    VIEW: 2
}
