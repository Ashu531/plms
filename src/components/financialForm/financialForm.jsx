import React,{useEffect, useState} from 'react'
import Button from '../button/button.jsx'
import { Dropdown } from '../dropdown/dropdown.jsx'
import { Input } from '../input/input.jsx'
import './/financialForm.css'
import axios from 'axios';

const employmentStatusList = [
    {
        'label': 'Salaried',
        'value' : 3,
        'disabled' : false
    },
    {
        'label': 'Self-Employed',
        'value' : 2,
        'disabled' : false
    },
    {
        'label': 'Unemployed',
        'value' : 4,
        'disabled' : false
    },
    {
        'label': 'Other',
        'value' : 5,
        'disabled' : false
    },
    {
        'label': 'Business',
        'value' : 6,
        'disabled' : false
    },
    {
        'label': 'Corporate',
        'value' : 7,
        'disabled' : false
    },
    {
        'label': 'Pensioner',
        'value' : 8,
        'disabled' : false
    },
]

export default function FinancialForm({
    viewType,
    prefilledFields=[],
    leadData,
    token
}) {

    const [employmentStatus, setEmploymentStatus] = useState({...defaultDropdownState});
    const [monthySalary, setMonthySalary] = useState({...defaultState});
    const [companyName, setCompanyName] = useState({...defaultState});


    const defaultState = {
        value: '',
        error: null
    };

    const defaultDropdownState = {
        value: -1,
        error: null
    }

    useEffect(()=>{
        handleFinancialData()
    },[leadData])


    const handleFinancialData=()=>{
        if(leadData?.borrowerData?.netMonthlyIncome?.length > 0){
            setMonthySalary({
                ...monthySalary,
                value: leadData?.borrowerData?.netMonthlyIncome,
            })
        }else{
            setMonthySalary({
                ...monthySalary,
                value: '',
            })
        }
        
        setCompanyName({
            ...companyName,
            value: leadData?.borrowerData?.lastCurrentEmployer,
        })

        employmentStatusList.forEach((item,index)=>{
            if(item.value === leadData?.borrowerData?.employmentStatusId){
                setEmploymentStatus({
                    ...employmentStatus,
                    value : leadData?.borrowerData?.employmentStatusId
                })
            }
        })

    }

 

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

    const submitData=async()=>{

        let data = {
            netMonthlyIncome: monthySalary.value,
            lastCurrentEmployer: companyName.value,
            employmentStatusId : employmentStatus.value
        }

        await axios.post(`${API_URL}/api/loan/financial/details/LEAD-${leadData?.borrowerData.leadId}/`,data,{
            headers: {
                token: `${token}`,
            },
        }).
        then(res => {
            console.log(res)
        }).catch(err=>console.log(err));
    }

  return (
    <div className='financial-form-container column'>
        <div className='financial-form-header'>
             Financial Details
        </div>
        <div className='column'>
            <div className='row full-width'>
                <Dropdown
                    items={employmentStatusList}
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
            <div className='row' style={{justifyContent:"space-between"}}>
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
                <div style={{width: '45%'}}>
                         <Button 
                        text='Submit'
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
                        onClick={()=>submitData()}
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