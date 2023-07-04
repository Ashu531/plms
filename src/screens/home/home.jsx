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
import UserConsentModal from '../../components/userConsentModal/userConsentModal.jsx';

export default function Home() {

    const [query, setQuery] = useState('');

    const [openPanel,setOpenPanel] = useState(false)
    const [openLeadForm,setOpenLeadForm] = useState(false)
    const [screen,setScreen] = useState(0)
    const [consentModal,setConsentModal] = useState(false)

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
        setOpenLeadForm(false)
    }

    ///////////////////////////////////////////////////////////////
    // Search Start

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


    const navigatePage=(i)=>{
        setScreen(i)
    }

    const closeUserConsentModal=()=>{
        setConsentModal(false)
    }
    

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
                    closeLeadModal={()=>_closeLeadForm()}
                 />
             }
             {
                 consentModal && 
                 <UserConsentModal 
                    closeUserConsentModal={()=>closeUserConsentModal()}
                 />
             }
        </div>
    )
            
}



