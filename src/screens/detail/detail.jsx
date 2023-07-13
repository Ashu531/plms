import React,{useEffect, useState, useRef} from 'react';
import caretIcon from '../../assets/Icons/caretIcon.svg'
import consentIcon from '../../assets/Icons/consentIcon.svg'
import DocumentCard from '../../components/documentCard/documentCard.jsx';
import TabBar from '../../components/tabBar/tabBar.jsx';
import Upload from '../../components/upload/upload.jsx';
import addIcon from '../../assets/Icons/addIcon.svg'
import axios from 'axios';
import './/detail.css'
import ActivityCard from '../../components/activityCard/activityCard.jsx';
import FinancialForm from '../../components/financialForm/financialForm.jsx';
import { EditableLeadForm } from '../../components/leadForm/leadform.jsx';
import { formViewTypes } from '../../forms/leadDetails.jsx';
import Lead from '../../entities/formDetails.js';
import { saveForm } from '../../helpers/apis';

export default function DetailPage(props) {

 const [tab,setTab] = useState(0);
 const [activities,setActivities] = useState([])
 const [comments,setComments] = useState([])
 const [leadData,setLeadData] = useState({})

 const formData = useRef(new Lead(
    '1234',
    'John Doe',
    'Dummy',
    '7868667889',
    'abc123@xyz.com',
    'John Snow',
    'Random',
    '500',
    '400',
    '3',
    2
 ));

 useEffect(()=>{
     getActivityData()
     getUserComment()
     getLeadOverview()
 },[])

 const handleSave = async () => {
    let res = await saveForm(formData.current.requestData());
 }

 const getUserComment=async()=>{
    await axios.get(`${API_URL}/api/loan/lead/comments/${props?.leadData?.leadId}/`,{
        headers: {
            token: `af2ecb4b5b2697d6de6204bf5a4e13c46dcfee27`,
        },
    }).
    then(res => {
        setComments(res.data.data.data)
    }).catch(err=>console.log(err));
 }

 const getActivityData=async()=>{
    await axios.get(`${API_URL}/api/loan/update/history/${props?.leadData?.leadId}/`,{
        headers: {
            token: `af2ecb4b5b2697d6de6204bf5a4e13c46dcfee27`,
        },
    }).
    then(res => {
        setActivities(res.data.data.data)
    }).catch(err=>console.log(err));
 }

 const getLeadOverview=async()=>{
    await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,{
        headers: {
            token: `af2ecb4b5b2697d6de6204bf5a4e13c46dcfee27`,
        },
    }).
    then(res => {
        setLeadData(res.data.data.data)
    }).catch(err=>console.log(err));
 }

  const handleBack=()=>{
    let i = 0
    props?.goToHomePage(i)
  }

  const handleTabNavigation = (i) => {
    setTab(i);
 }

  return (
    <div className='lead-detail-page'>
        <div className='lead-page-header full-width'>
            <div className='row full-width'>
                <div className='row'>
                    <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                    <div className='column' style={{marginTop: 20,marginLeft: 12}}>
                        <span className='lead-page-heading'>{props?.leadData?.fullName}</span>
                        <span className='lead-page-subheading'> {props?.leadData?.mobile}</span>
                    </div>
                </div>
                <div className='column' style={{alignItems:'flex-end'}}>
                    <div className='row' style={{justifyContent:'flex-end'}}>
                        <span className='lead-page-intruction-label'>Lead Consent: </span>
                        <img src={consentIcon} />
                    </div>
                    <span className='consent-link' onClick={()=>props?.openUserConsentModal()}>
                        Ask for Consent
                    </span>
                </div>
            </div>
        </div>
        <div className='lead-page-content'>
            <TabBar 
                items={["Details", "Financials", "Documents", "Activity Log & Comments"]}
                handleTabNumber={handleTabNavigation}
                selected={tab}
            />
            {
                tab === 0 && 
                <EditableLeadForm
                    viewType={formViewTypes.VIEW}
                    formData={formData.current}
                    showHeadings={true}
                    handleSave={handleSave}
                />
            }
            {
                tab === 1 && 
                <div className='financials-container row full-width'>
                    <FinancialForm 
                        leadData={leadData}
                    />
                </div>
            }
            {
                tab === 2 && 
                <div className='document-container row full-width'>
                    <div className='column' style={{gap:20}}>
                        <DocumentCard
                          title={'PAN Card'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <DocumentCard
                          title={'Address Proof'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <DocumentCard
                          title={'Bank Statement'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <div className='add-info-container row full-width'>
                            <div className='row'>
                                <img src={addIcon} height={20} width={20} style={{objectFit:'contain'}} />
                                <span className='add-doc-text'>Additional Documents</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"></path></svg>
                        </div>
                    </div>
                    <div className='activity-container-divider' />
                    <div className='row'>
                        <Upload showBorder={true} />
                    </div>
                </div>    
            }
            {
                tab === 3 &&
                <div className='activity-container row full-width'>
                    <div className='activity-container column '>
                        <span className='activity-container-heading'>Comments</span>
                        <div className='column' style={{gap: 10,marginTop: 16}}>
                            {
                              comments ? comments.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.log}
                                                name={item.category}
                                                time={'2022-04-12 18:34:49'}
                                        />
                                    )
                                })
                                : <div style={{color: '#000'}}>No Results</div>
                            }
                            
                        </div>
                    </div>
                    <div className='activity-container-divider' />
                    <div className='activity-container column'>
                        <span className='activity-container-heading'>Activity Log</span>
                        <div className='column' style={{gap: 10,marginTop: 16}}>
                        {
                              activities ? activities.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.template}
                                                name={item.category}
                                                time={'2022-04-12 18:34:49'}
                                        />
                                    )
                                })  : <div style={{color: '#000'}}>No Results</div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
