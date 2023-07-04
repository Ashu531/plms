import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button.jsx';
import addIcon from '../../assets/Icons/addIcon.svg'
import profileIcon from '../../assets/Icons/userIcon.svg';
import checkIcon from '../../assets/Icons/check.svg';
import Status from '../../components/status/status.jsx';
import './home.css'
import Table from '../../components/table/table.jsx';
import Header from '../../components/header/header.jsx'
import SlidingPanel from '../../components/sliding-panel/sliding_panel.jsx'
import LeadForm from '../../components/leadForm/leadform.jsx';
import StudentDetailForm, { formViewTypes } from '../../forms/studentDetails.jsx';
import LoanDetailsForm from '../../forms/loanDetails.jsx';
import ChoiceBox from '../../components/checklist/checklist.jsx';

export default function Home() {

    const [openPanel,setOpenPanel] = useState(false)
    const [openLeadForm,setOpenLeadForm] = useState(false)

    const openSlidingPanel = () =>{
        setOpenPanel(true)
    }

    const closeSlidingPanel=()=>{
        setOpenPanel(false)
    }

    const _openLeadForm=()=>{
        setOpenLeadForm(true)
    }

    const _closeLeadForm=()=>{
        setOpenLeadForm(true)
    }

    ///////////////////////////////////////////////////////////////
    // Search Start

    const [query, setQuery] = useState('');
    const onSearch = async (query) => {
        setQuery(query);
    }

    const handleSearch = (query) => {
        //search api here
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleSearch(query);
        }, 500)
    
        return () => clearTimeout(delayDebounce)
    }, [query]);

    // Search End
    //////////////////////////////////////////////////////////////////

    return (
        <div className='home-container'>
            <Header
                onSearchChange={onSearch}
            />
            <div className='row' style={{width: '100%', gap: '10px', justifyContent: 'space-between'}}>
                <Status 
                lightText={'478 Cases'}
                boldText={'All'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Incomplete'}
                bgColor={`#0DB78F`}
                textColor={`#FFFFFF`}
                style={{padding: '14px'}}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'In Process'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Closed'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Approved'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />

                <Status 
                lightText={'478 Cases'}
                boldText={'Disbursed'}
                // bgColor={`#F7F0FF`}
                // textColor={`#8F14CC`}
                />
            </div>

            <div className='row' style={{flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'flex-start'}}>
                <div style={{width: '40%'}}>
                    <ChoiceBox
                        title={'Additional Documents'}
                        list={[
                            {value: 0, label: 'item 1'},
                            {value: 1, label: 'item 2'},
                            {value: 2, label: 'item 3'},
                            {value: 3, label: 'item 4'},
                            {value: 4, label: 'item 5'},
                        ]}
                        onSelect={(selected) => console.log(selected)}
                    />
                </div>
            </div>

            {/* <div className='row' style={{flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
                <div style={{width: '40%'}}>
                    <LoanDetailsForm
                        viewType={formViewTypes.VIEW} 
                        formData={{
                            name: 'Rashmi Ranjan Sathapathy',
                            course: 'Embedded Software Development',
                            courseFee: '59000',
                            loanAmount: '55000',
                            tenure: -1,
                            advanceEmi: -1
                        }}
                    />
                </div>
                <div style={{width: '40%'}}>
                    <LoanDetailsForm
                        viewType={formViewTypes.EDIT} 
                        prefilledFields={[loanFormInputTypes.name]}
                        formData={{
                            name: 'Rashmi Ranjan Sathapathy',
                            course: '',
                            courseFee: '',
                            loanAmount: '',
                            tenure: -1,
                            advanceEmi: -1
                        }}
                    />
                </div>

                <div style={{width: '40%'}}>
                    <LoanDetailsForm
                        viewType={formViewTypes.CREATE} 
                        prefilledFields={[loanFormInputTypes.name]}
                    />
                </div>
            </div> */}

             <div className='tab'> 
                 <div className='lead-count'>
                 Showing 478 Incomplete leads
                 </div>
                 <Button 
                    leadingIcon={addIcon}
                    text='Create'
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
                    onClick={()=>_openLeadForm()}
                  />
             </div>
             <div className='table-container'>
                <Table openSlidingPanel={()=>openSlidingPanel()} />
             </div>
             {
                 openPanel && 
                 <SlidingPanel closeSlidingPanel={()=>closeSlidingPanel()} />
             }
             {
                 openLeadForm &&
                 <LeadForm 
                     _closeLeadForm={()=>_closeLeadForm()}
                 />
             }
        </div>
    )
}



