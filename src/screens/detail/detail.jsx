import React,{useEffect, useState, useRef} from 'react';
import caretIcon from '../../assets/Icons/caretIcon.svg'
import consentIcon from '../../assets/Icons/userConsentIcon.svg'
import DocumentCard from '../../components/documentCard/documentCard.jsx';
import TabBar from '../../components/tabBar/tabBar.jsx';
import Upload, { uploadtStates } from '../../components/upload/upload.jsx';
import axios from 'axios';
import './/detail.css'
import ActivityCard from '../../components/activityCard/activityCard.jsx';
import FinancialForm from '../../components/financialForm/financialForm.jsx';
import { EditableLeadForm } from '../../components/leadForm/leadform.jsx';
import { formViewTypes } from '../../forms/leadDetails.jsx';
import { leadState, requestData } from '../../entities/formDetails.js';
import ChoiceBox, { Checklist } from '../../components/checklist/checklist.jsx';
import { Bars, TailSpin } from "react-loader-spinner";

const documentTypes = [
    'Aadhaar Card', 
    'Passport', 
    'Driving License', 
    'Voter ID', 
    'Landline Bill', 
    'Electricity Bill', 
    'Gas Bill', 
    'Water Bill',
    'Others'
]

export default function DetailPage({
    instituteName,
    leadOverview,
    previousFormData,
    formData, 
    setFormData,
    ...props
}) {

 const [tab,setTab] = useState(0);
 const [activities,setActivities] = useState([])
 const [comments,setComments] = useState([])
 const [leadData,setLeadData] = useState({})
 const [documentValue,setDocumentValue] = useState('PAN Card')

 const [selectedDocTypes, setSelectedDocTypes] = useState(new Set([]));
 const [currentUploadState, setCurrentUploadState] = useState(uploadtStates.drop);


const [selectedFiles, setSelectedFiles] = useState([]);
const [deletedFiles, setDeletedFiles] = useState([]);
const [verified, setVerified] = useState(false);
const [verifiedFiles, setVerifiedFiles] = useState([]);

const [activityLoader,setActivityLoader] = useState(false)
const [activityNoResult,setActivityNoResult] = useState(false)
const [commentLoader,setCommentLoader] = useState(false)
const [commentNoResult,setCommentNoResult] = useState(false)

const switchToDropState = () => {
    setCurrentUploadState(uploadtStates.drop)
}

const switchToPreviewState = () => {
    setCurrentUploadState(uploadtStates.preview)
}

const switchToUploadedState = () => {
    setCurrentUploadState(uploadtStates.uploaded)
}

const removeFile = (i) => {
    let selected = [...deletedFiles];
    
    selected.forEach((file, idx) => {
      if(idx == i)
        selected[idx] = -1;
    });

    setDeletedFiles([...selected]);
    setVerifiedFiles([]);
    switchToDropState();
}

const getDocumentType = () => {
    switch(documentValue){
        case 'PAN Card': return 'PAN_CARD'
        case 'Aadhaar Card': return 'AADHAR_CARD'
        case 'Bank Statement': return 'BANK_STATEMENT'
        case 'Passport': return 'PHOTO' 
        case 'Driving License': return 'PHOTO' 
        case 'Voter ID': return 'PHOTO' 
        case 'Landline Bill': return 'PHOTO' 
        case 'Electricity Bill': return 'PHOTO' 
        case 'Gas Bill': return 'PHOTO' 
        case 'Water Bill': return 'PHOTO'
        case 'Others': return 'PHOTO'
    }
}

 useEffect(()=>{
     getActivityData()
     getUserComment()
     getLeadOverview()
 },[])

 const getUserComment=async()=>{
     setCommentLoader(true)
    await axios.get(`${API_URL}/api/loan/lead/comments/${props?.leadData?.leadId}/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setCommentLoader(false)

        if(res.data.data.data.length > 0){
            setComments(res.data.data.data)
        }else{
            setCommentNoResult(true)
        }
    }).catch(err=>{
        setCommentLoader(false)
    });
}

 const getActivityData=async()=>{
    setActivityLoader(true)
    await axios.get(`${API_URL}/api/loan/update/history/${props?.leadData?.leadId}/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setActivityLoader(false)
        if(res.data.data.data.length > 0){
            setActivities(res.data.data.data)
        }else{
            setActivityNoResult(true)
        }
        
    }).catch(err=>{
        setActivityLoader(false)
    });
 }

 const getLeadOverview=async()=>{
    await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setLeadData(res.data.data.data)
    }).catch(err=>console.log(err));
 }

 const updateLead = async () => {

    // console.log(data, "edit payload")

    await axios.post(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,
    requestData({...formData, borrowerUuid: leadOverview.borrowerUuid}),
    {
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        // setLeadData(res.data.data.data)
    }).catch(err=>console.log(err));
 }

  const handleBack=()=>{
    let i = 0
    props?.goToHomePage(i)
  }

  const handleTabNavigation = (i) => {
    setTab(i);
 }

const handleDocumentsCard=(data)=>{
setDocumentValue(data)
    if(documentValue != data){
        removeFile(0)
    }
    
}

const handleDocTypeSelection = (docType) => {
        if(selectedDocTypes.has(docType)){
            setSelectedDocTypes(prev => {prev.delete(docType); return new Set(prev);})
        } else {
            setSelectedDocTypes(prev => new Set(prev.add(docType)));
        }
}

console.log(leadOverview,"leadData++")

  return (
    <div className='lead-detail-page'>
        <div className='lead-page-header full-width'>
            <div className='row full-width'>
                <div className='row'>
                    <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                    <div className='column' style={{marginTop: 20,marginLeft: 12}}>
                        <span className='lead-page-heading' >{props?.leadData?.fullName} : {props?.leadData?.leadId}</span>
                        <span className='lead-page-subheading'> {props?.leadData?.mobile}</span>
                    </div>
                </div>
                <div className='column' style={{alignItems:'flex-end'}}>
                    {
                        props?.consent ? 
                        <>
                        <div className='row' style={{justifyContent:'flex-end'}}>
                            <span className='lead-page-intruction-label'>Lead Consent: </span>
                            <img src={consentIcon} />
                        </div>
                        { leadOverview?.utrDetail.utrNo &&
                            <span className='lead-page-subheading' style={{marginTop:0}}>UTR : {leadOverview?.utrDetail?.utrNo}</span>
                        }
                        {
                           leadOverview?.utrDetail?.disbursementDate &&
                           <span className='lead-page-subheading-time'>Disbursed at:  {leadOverview?.utrDetail?.disbursementDate}</span> 
                        }
                        {
                           leadOverview?.utrDetail?.disbursementAmount &&
                           <span className='lead-page-subheading-time'>Disbursed Amount:  {leadOverview?.utrDetail?.disbursementAmount}</span> 
                        }
                        </>
                        :
                         <span className='consent-link' onClick={()=>props?.openUserConsentModal()}>
                            Ask for Consent
                         </span>
                    }
                    
                   
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
                formData && <EditableLeadForm
                    instituteName={instituteName}
                    viewType={formViewTypes.VIEW}
                    previousFormData={previousFormData}
                    formData={formData}
                    setFormData={(data) => setFormData(data)}
                    showHeadings={true}
                    handleSave={updateLead}
                />
            }
            {
                tab === 1 && 
                <div className='financials-container row full-width'>
                    <FinancialForm 
                        leadData={leadData}
                        token={props?.token}
                    />
                </div>
            }
            {
                tab === 2 && 
                <div className='document-container row full-width'>
                    <div className='column' style={{gap:20}}>
                        <div style={{...(documentValue === 'PAN Card' ? {background: '#F7F0FF',borderRadius: 8} : null), width: '100%'}}>
                            <DocumentCard
                                onClick={()=>handleDocumentsCard('PAN Card')}
                                title={'PAN Card'}
                                desc={'Upload a clear image of your Document clearly stating your name and date of birth.'}
                                instruction={'Format: PDF, PNG, JPEG, JPG.'}
                            />
                        </div>
                        <div style={{...(documentValue === 'Aadhaar Card' ? {background: '#F7F0FF',borderRadius: 8} : null), width: '100%'}}>
                            <DocumentCard
                                onClick={()=>handleDocumentsCard('Aadhaar Card')}
                                title={'Aadhaar Card'}
                                desc={'Upload a clear image of your Document clearly stating your name and date of birth.'}
                                instruction={'Format: PDF, PNG, JPEG, JPG.'}
                            />
                        </div>
                        <div style={{...(documentValue === 'Bank Statement' ? {background: '#F7F0FF',borderRadius: 8} : null), width: '100%'}}>
                            <DocumentCard
                                onClick={()=>handleDocumentsCard('Bank Statement')}
                                title={'Bank Statement'}
                                desc={'Upload a clear image of your Document clearly stating your name and date of birth.'}
                                instruction={'Format: PDF, PNG, JPEG, JPG.'}
                            />
                        </div>
                        {/* <div className='add-info-container row full-width'>
                            <div className='row'>
                                <img src={addIcon} height={20} width={20} style={{objectFit:'contain'}} />
                                <span className='add-doc-text'>Additional Documents</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"></path></svg>
                        </div> */}
                        <div style={{width: '100%'}}>
                            <ChoiceBox 
                                list={documentTypes}
                                onSelect={(docType) => handleDocTypeSelection(docType)}
                                title={'Additional Documents'}
                                selected={selectedDocTypes}
                            />
                        </div>

                        {Array.from(selectedDocTypes).map((docType, index) => (
                            <div style={{...(documentValue === docType ? {background: '#F7F0FF',borderRadius: 8} : null), width: '100%'}}>
                                <DocumentCard
                                    onClick={()=>handleDocumentsCard(docType)}
                                    id={`${docType}-${index}`}
                                    title={docType}
                                    desc={'Upload a clear image of your Document clearly stating your name and date of birth.'}
                                    instruction={'Format: PDF, PNG, JPEG, JPG.'}
                                    isMandatory={false}
                                    onRemove={() => {
                                        handleDocTypeSelection(docType)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='row' style={{border: '1px solid #8F14CC', borderRadius: '8px', height: '560px', justifyContent: 'center'}}>
                        <Upload 
                            showBorder={true} 
                            token={props?.token} 
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            deletedFiles={deletedFiles}
                            setDeletedFiles={setDeletedFiles}
                            verifiedFiles={verifiedFiles}
                            setVerifiedFiles={setVerifiedFiles}
                            removeFile={removeFile}
                            getReferenceId={() => leadOverview.borrowerUuid}
                            getLeadId={() => `LEAD-${leadOverview.leadId}`}
                            getDocumentType={getDocumentType}
                            currentUploadState={currentUploadState}
                            onDrop={switchToPreviewState}
                            onCancel={() => removeFile(0)}
                            onUpload={() => {
                                switchToUploadedState();
                                setTimeout(() => switchToDropState(), 3000)
                            }}
                        />
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
                              comments?.length > 0 && comments.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.log}
                                                name={item.updatedBy}
                                                time={item?.createdAt?.date}
                                        />
                                    )
                                })
                            }
                            {
                                commentNoResult &&
                                <div style={{color: '#000'}}>No Results</div>
                            }
                            {
                                commentLoader && 
                                <div className="credenc-loader-white">
                                    <TailSpin color="#00BFFF" height={100} width={100}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='activity-container-divider' />
                    <div className='activity-container column'>
                        <span className='activity-container-heading'>Activity Log</span>
                        <div className='column' style={{gap: 10,marginTop: 16}}>
                        {
                              activities.length > 0 && activities.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.template}
                                                name={item.category}
                                                time={item.created.date}
                                        />
                                    )
                                }) 
                            }
                            {
                                activityNoResult &&
                                <div style={{color: '#000'}}>No Results</div>
                            }
                        </div>
                        {
                            activityLoader && 
                            <div className="credenc-loader-white">
                                <TailSpin color="#00BFFF" height={100} width={100}/>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
