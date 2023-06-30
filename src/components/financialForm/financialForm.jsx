import React,{useEffect, useState} from 'react'
import { Dropdown } from '../dropdown/dropdown.jsx'
import { Input } from '../input/input.jsx'
import './/financialForm.css'

export default function FinancialForm({
    viewType,
    prefilledFields=[],
}) {

    const defaultState = {
        value: '',
        error: null
    };

    const defaultDropdownState = {
        value: -1,
        error: null
    }

    const [employmentStatus, setEmploymentStatus] = useState({...defaultDropdownState});
    const [monthySalary, setMonthySalary] = useState({...defaultState});
    const [companyName, setCompanyName] = useState({...defaultState});

    const employmentStatusLabel = () => 'Employment Status ';
    const monthySalaryLabel = () => 'Current Monthly Salary';
    const companyNameLabel = () => 'Company Name';

    const getLabel = (type) => {
        
        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatusLabel();
            case financialFormInputTypes.monthySalary: return monthySalaryLabel();
            case financialFormInputTypes.companyName: return companyNameLabel();
        }
        
    }

    const employmentStatusRequired = () => viewType == formViewTypes.CREATE;
    const monthySalaryRequired = () => viewType == formViewTypes.CREATE;
    const companyNameRequired = () => viewType == formViewTypes.CREATE;

    const getRequired = (type) => {

        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatusRequired();
            case financialFormInputTypes.monthySalary: return monthySalaryRequired();
            case financialFormInputTypes.companyName: return companyNameRequired();
        }

    }

    const employmentStatusCheck = () => false;
    const monthySalaryCheck = () => false;
    const companyNameCheck = () => false;

    const getCheck = (type) => {
        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatusCheck();
            case financialFormInputTypes.monthySalary: return monthySalaryCheck();
            case financialFormInputTypes.companyName: return companyNameCheck();
        }
    }

    const monthySalaryPlaceholder = () => '';
    const companyNamePlaceholder = () => '';
    const employmentStatusPlaceholder = () => '-Select-';
    
    const getPlaceholder = (type) => {
        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatusPlaceholder();
            case financialFormInputTypes.monthySalary: return monthySalaryPlaceholder();
            case financialFormInputTypes.companyName: return companyNamePlaceholder();
        }
    }

    const getValue = (type) => {
        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatus.value;
            case financialFormInputTypes.monthySalary: return monthySalary.value;
            case financialFormInputTypes.companyName: return companyName.value;
        }
    }

    const onChange = (type, str, checked, changeType) => {
        switch(type){
            case financialFormInputTypes.employmentStatus: return handleEmploymentChange(str);
            case financialFormInputTypes.monthySalary: return handleMonthlyChange(str);
            case financialFormInputTypes.companyName: return handleCompanyNameChange(str);
        }
    }

    const handleEmploymentChange = (str) => {
        setEmploymentStatus({...employmentStatus, value: str});
    };

    const handleMonthlyChange = (str) => {
        setMonthySalary({...monthySalary, value: str});
    };

    const handleCompanyNameChange= (str) =>{
        setCompanyName({...companyName, value: str});
    }

    const getDisabled = (type) => {

        if(viewType == formViewTypes.VIEW){
            return true;
        }

        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatusDisabled();
            case financialFormInputTypes.monthySalary: return monthySalaryDisabled();
            case financialFormInputTypes.companyName: return companyNameDisabled();

        }

    }

    const employmentStatusDisabled = () => prefilledFields.indexOf(financialFormInputTypes.employmentStatus) > -1;
    const monthySalaryDisabled = () => prefilledFields.indexOf(financialFormInputTypes.monthySalary) > -1;
    const companyNameDisabled = () => prefilledFields.indexOf(financialFormInputTypes.companyName) > -1;

    const getError = (type) => {

        switch(type){
            case financialFormInputTypes.employmentStatus: return employmentStatus.error;
            case financialFormInputTypes.monthySalary: return monthySalary.error;
            case financialFormInputTypes.companyName: return companyName.error;
        }

    }

    const getType = (type) => {

        switch(type){
            case financialFormInputTypes.employmentStatus: return "number";
            case financialFormInputTypes.monthySalary: return "number";
            case financialFormInputTypes.companyName: return "text";
        }

    }

  return (
    <div className='financial-form-container column'>
        <div className='financial-form-header'>
             Financial Details
        </div>
        <div className='column'>
            <div className='row full-width'>
                <Dropdown
                    label={getLabel(financialFormInputTypes.employmentStatus)}
                    required={getRequired(financialFormInputTypes.employmentStatus)}
                    showCheck={getCheck(financialFormInputTypes.employmentStatus)}
                    placeholder={getPlaceholder(financialFormInputTypes.employmentStatus)}
                    value={getValue(financialFormInputTypes.employmentStatus)}
                    onChange={(str) => onChange(financialFormInputTypes.employmentStatus, str)}
                    disabled={getDisabled(financialFormInputTypes.employmentStatus)}
                    error={getError(financialFormInputTypes.employmentStatus)}
                />
                <div className='finacial-form-divider'/>
                <Input
                    label={getLabel(financialFormInputTypes.monthySalary)}
                    required={getRequired(financialFormInputTypes.monthySalary)}
                    showCheck={getCheck(financialFormInputTypes.monthySalary)}
                    placeholder={getPlaceholder(financialFormInputTypes.monthySalary)}
                    leadingText={'₹'}
                    value={getValue(financialFormInputTypes.monthySalary)}
                    onChange={(str) => onChange(financialFormInputTypes.monthySalary, str)}
                    disabled={getDisabled(financialFormInputTypes.monthySalary)}
                    error={getError(financialFormInputTypes.monthySalary)}
                    // type={getType(financialFormInputTypes.monthySalary)}
                />
            </div>
            <div className='row'>
                <div style={{width:'45%'}}>
                    <Input
                        label={getLabel(financialFormInputTypes.companyName)}
                        required={getRequired(financialFormInputTypes.companyName)}
                        showCheck={getCheck(financialFormInputTypes.companyName)}
                        placeholder={getPlaceholder(financialFormInputTypes.companyName)}
                        value={getValue(financialFormInputTypes.companyName)}
                        onChange={(str) => onChange(financialFormInputTypes.companyName, str)}
                        disabled={getDisabled(financialFormInputTypes.companyName)}
                        error={getError(financialFormInputTypes.companyName)}
                        // style={{width: '50%'}}
                        // type={getType(financialFormInputTypes.companyName)}
                    />
                </div>
            </div>

        </div>
    </div>
  )
}


export const financialFormInputTypes = {
   employmentStatus: 0,
   monthySalary: 1,
   companyName: 2
}

export const formViewTypes = {
    CREATE: 0,
    EDIT: 1,
    VIEW: 2
}