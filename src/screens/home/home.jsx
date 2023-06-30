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
import { useHistory } from "react-router-dom";
import { Input } from '../../components/input/input.jsx';
import { Dropdown } from '../../components/dropdown/dropdown.jsx';
import DetailPage from '../detail/detail.jsx';
import StudentDetailForm, { formViewTypes, studentFormInputTypes } from '../../forms/studentDetails.jsx';
import LoanDetailsForm, { loanFormInputTypes } from '../../forms/loanDetails.jsx';

export default function Home() {

    const [query, setQuery] = useState('');

    const [openPanel,setOpenPanel] = useState(false)
    const [openLeadForm,setOpenLeadForm] = useState(false)
    const [screen,setScreen] = useState(0)

    let history = useHistory();

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


    const onSearch = async (query) => {
        setQuery(query);
    }

    const handleSearch = (query) => {
        //search api here
    }

    const navigatePage=(i)=>{
        setScreen(i)
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleSearch(query);
        }, 500)
    
        return () => clearTimeout(delayDebounce)
    }, [query]);

    return (
        <div className='home-container'>
            
            {
                screen === 0 && <div className='column full-width'>
                    <Header
                        onSearchChange={onSearch}
                    />
                <div className='row' style={{width: '100%', height: '70px', gap: '10px', justifyContent: 'space-between'}}>
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
                    <Table 
                        openSlidingPanel={()=>openSlidingPanel()} 
                        goToDetailPage={(i)=>navigatePage(i)}
                    />
                </div>
            </div>
            }
            {/* <div className='row' style={{flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'flex-start'}}>
                <div style={{width: '40%'}}>
                    <StudentDetailForm
                        viewType={formViewTypes.CREATE} 
                        // formData={{
                        //     leadId: '327669',
                        //     name: 'Rashmi Ranjan Sathapathy',
                        //     institute: 'Skill Lync',
                        //     mobile: '9040146344',
                        //     email: 'rrsatzat@gmail.com'
                        // }}
                    />
                </div>
                <div style={{width: '40%'}}>
                    <LoanDetailsForm
                        viewType={formViewTypes.CREATE} 
                        // formData={{
                        //     name: 'Rashmi Ranjan Sathapathy',
                        //     sameAsStudent: false,
                        //     course: 'Embedded Software Development',
                        //     courseFee: '59000',
                        //     loanAmount: '55000',
                        //     tenure: -1,
                        //     advanceEmi: -1
                        // }}
                    />
                </div>
            </div> */}

            
            {
                screen === 1 && 
                <div className='full-width'>
                    <DetailPage goToHomePage={(i)=>navigatePage(i)}/>
                </div>
            }
            
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



