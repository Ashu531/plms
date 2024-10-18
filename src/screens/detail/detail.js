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
import addIcon from "../../assets/Icons/addIcon.svg";
import CommentBoxModal from '../../components/commentBox/commentBox';
import Button from '../../components/button/button.jsx';
import LenderForm from '../../components/lenderForm/lenderForm.jsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AccountAndAddress from '../../components/detailOverview.js/detailOverview';
import moment from "moment"
import { message } from 'antd';

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
const [loader,setLoader] = useState(false)
const [isModalVisible, setIsModalVisible] = useState(false);
const  [lenderData,setLenderData] = useState([])
const [existingDocuments, setExistingDocuments] = useState([]);
const [loanTypeList,setLoanTypeList] = useState([])

useEffect(() => {
  fetchExistingDocuments();
}, []);

const fetchExistingDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/documents/`, {
      headers: { 'Token': props?.token }
    });
    setExistingDocuments(response.data.data);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};

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
        case 'PAN Card': return 'pan'
        case 'Aadhaar Card': return 'aadhar'
        case 'Bank Statement': return 'statement'
        case 'Passport': return 'passport' 
        case 'Driving License': return 'license' 
        case 'Voter ID': return 'PHOTO' 
        case 'Landline Bill': return 'PHOTO' 
        case 'Electricity Bill': return 'PHOTO' 
        case 'Gas Bill': return 'PHOTO' 
        case 'Water Bill': return 'PHOTO'
        case 'Others': return 'other'
    }
}

 useEffect(()=>{
     getActivityData()
     getUserComment()
     getLenderData()
     getLoanType()
 },[])

 const getLoanType=async()=>{
    await axios.get(`${API_URL}/api/loan/v1/loantype/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        if(res.data.data.length > 0){
            setLoanTypeList(res.data.data)
        }
    }).catch(err=>{
        console.log(err,"error")
    });
}

 const getLenderData=async()=>{
    await axios.get(`${API_URL}/api/loan/v1/loan-lenders/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        if(res.data.data.length > 0){
            setLenderData(res.data.data)
        }
    }).catch(err=>{
        console.log(err,"error")
    });
 }

 const getUserComment=async()=>{
     setCommentLoader(true)
    await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/comments/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setCommentLoader(false)
        if(res.data.data.length > 0){
            setComments(res.data.data)
        }else{
            setCommentNoResult(true)
        }
    }).catch(err=>{
        setCommentLoader(false)
    });
}

 const getActivityData=async()=>{
    setActivityLoader(true)
    await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/logs/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setActivityLoader(false)
        if(res.data.data.length > 0){
            setActivities(res.data.data)
        }else{
            setActivityNoResult(true)
        }
        
    }).catch(err=>{
        setActivityLoader(false)
    });
 }

 const updateLead = async () => {
    await axios.post(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/`,
    requestData({...formData}),
    {
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setLeadData(res.data)
    }).catch(error=>{
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        message.error(errorMessage);
    });
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

const handleCommentSubmit = async (comment) => {
    await axios.post(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/comments/`, {
        comment,
    }, {
        headers: {
            token: `${props?.token}`,
        },
    }).then(res => {
        getUserComment();
    }).catch(error => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        message.error(errorMessage);
    });
    closeCommentBox();
}

const closeCommentBox = () => {
    setIsModalVisible(false);
}

const openCommentBox = () => {
    setIsModalVisible(true);
}

const downloadAll = async () => {
    const zip = new JSZip();
  
    const downloadPromises = existingDocuments.map(async (doc) => {
      const fileName = doc[0];
      const fileUrl = doc[1];
      let fileType = doc[2]; 

      if (fileType === 'image') {
        fileType = '.jpeg';
      } else if (!fileType.startsWith('.')) {
        fileType = `.${fileType}`;
      }
  
      try {
        const response = await axios.get(fileUrl, { responseType: 'blob' });
  
        const formattedFileName = fileName.endsWith(fileType) ? fileName : `${fileName}${fileType}`;
  
        zip.file(formattedFileName, response.data);
      } catch (error) {
        console.error(`Error downloading ${fileName}:`, error);
      }
    });
  
    await Promise.all(downloadPromises);
  
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'documents.zip');
    });
  };
  
  

  return (
    <div className='lead-detail-page'>
        <div className='lead-page-header full-width'>
            <div className='row full-width'>
                <div className='row'>
                    <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                    <div className='column' style={{marginTop: 20,marginLeft: 12}}>
                        <span className='lead-page-heading' >{props?.leadData?.student_name} : {props?.leadData?.application_id}</span>
                        <span className='lead-page-subheading'> {props?.leadData?.applicant_phone}</span>
                        <span className='lead-page-subheading'>Created at: {moment(props?.leadData?.created_at).format('LLL')}</span>
                    </div>
                </div>
                {/* <div className='column' style={{alignItems:'flex-end'}}>
                    {
                        props?.consent ? 
                        <>
                        <div className='row' style={{justifyContent:'flex-end'}}>
                        <div className='plms-refresh-container' onClick={()=>handleRefresh()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M194.83,189.18a4,4,0,0,1,0,5.65c-1,1-25.65,25.17-66.83,25.17-23.93,0-47.35-10.05-67.73-29.08a146.39,146.39,0,0,1-16.27-18V208a4,4,0,0,1-8,0V160a4,4,0,0,1,4-4H88a4,4,0,0,1,0,8H47.41c10,14.06,38.39,48,80.59,48,37.75,0,60.95-22.6,61.18-22.83A4,4,0,0,1,194.83,189.18ZM216,44a4,4,0,0,0-4,4V83.07a146.39,146.39,0,0,0-16.27-18C175.35,46.05,151.93,36,128,36,86.82,36,62.2,60.14,61.17,61.17a4,4,0,0,0,5.65,5.66C67.05,66.6,90.25,44,128,44c42.2,0,70.63,33.94,80.59,48H168a4,4,0,0,0,0,8h48a4,4,0,0,0,4-4V48A4,4,0,0,0,216,44Z"></path></svg>
                        </div>
                            <span className='lead-page-intruction-label'>Lead Consent: </span>
                            <img src={consentIcon} />
                        </div>
                        { leadOverview?.utrDetail?.utrNo &&
                            <span className='lead-page-subheading' style={{marginTop:0}}>UTR : {leadOverview?.utrDetail?.utrNo}</span>
                        }
                        {
                           leadOverview?.utrDetail?.disbursementDate &&
                           <span className='lead-page-subheading-time'>Disbursed at:  {leadOverview?.utrDetail?.disbursementDate}</span> 
                        }
                        {
                           leadOverview?.utrDetail?.disbursementAmount &&
                           <span className='lead-page-subheading-time'>Disbursed Amount:  ₹{leadOverview?.utrDetail?.disbursementAmount}</span> 
                        }
                        </>
                        :
                        <div className='row' style={{justifyContent:'flex-end'}}>
                             <div className='plms-refresh-container' onClick={()=>handleRefresh()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M194.83,189.18a4,4,0,0,1,0,5.65c-1,1-25.65,25.17-66.83,25.17-23.93,0-47.35-10.05-67.73-29.08a146.39,146.39,0,0,1-16.27-18V208a4,4,0,0,1-8,0V160a4,4,0,0,1,4-4H88a4,4,0,0,1,0,8H47.41c10,14.06,38.39,48,80.59,48,37.75,0,60.95-22.6,61.18-22.83A4,4,0,0,1,194.83,189.18ZM216,44a4,4,0,0,0-4,4V83.07a146.39,146.39,0,0,0-16.27-18C175.35,46.05,151.93,36,128,36,86.82,36,62.2,60.14,61.17,61.17a4,4,0,0,0,5.65,5.66C67.05,66.6,90.25,44,128,44c42.2,0,70.63,33.94,80.59,48H168a4,4,0,0,0,0,8h48a4,4,0,0,0,4-4V48A4,4,0,0,0,216,44Z"></path></svg>
                             </div>
                            <span className='consent-link' onClick={()=>props?.openUserConsentModal()}>
                                Ask for Consent
                            </span>
                        </div> 
                    }
                    
                   
                </div> */}
                {
                    tab === 3 &&
                    <div style={{width: '20%'}}>
                    <Button
                        text='Download All'
                        classes={{
                            background: "#C2185B",
                            borderRadius: "8px",
                            height: "44px",
                          }}
                          textClass={{
                            color: "#FFF",
                            fontSize: "16px",
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                          }}
                        onClick={() => downloadAll()}
                    />
                </div>
                }
               
            </div>
        </div>
        <div className='lead-page-content'>
            <TabBar 
                items={["Details", "Financials", "Lender","Documents", "Comments","Account & Address"]}
                handleTabNumber={handleTabNavigation}
                selected={tab}
            />
            {
                tab === 0 && 
                formData && <div className="scrollable-form-container">
                    <EditableLeadForm
                        instituteName={instituteName}
                        viewType={formViewTypes.VIEW}
                        previousFormData={previousFormData}
                        formData={formData}
                        setFormData={(data) => setFormData(data)}
                        showHeadings={true}
                        handleSave={updateLead}
                    />
              </div>
            }
            {
                tab === 1 && 
                <div className='financials-container row full-width'>
                    <FinancialForm 
                        leadData={props?.leadData}
                        token={props?.token}
                    />
                </div>
            }
            {
                tab === 2 && 
                <div className='financials-container row full-width'>
                    <LenderForm
                        leadData={props?.leadData}
                        lenderData={lenderData}
                        loanTypeList={loanTypeList}
                        token={props?.token}
                    />
                </div>
            }
            {
                tab === 3 && 
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
                    <div className='row' style={{border: '1px solid #C2185B', borderRadius: '8px', justifyContent: 'center'}}>
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
                            // getReferenceId={() => leadOverview.borrowerUuid}
                            getLeadId={() => `LEAD-${props?.leadData?.id}`}
                            getDocumentType={getDocumentType}
                            currentUploadState={currentUploadState}
                            onDrop={switchToPreviewState}
                            onCancel={() => removeFile(0)}
                            onUpload={() => {
                                switchToUploadedState();
                                setTimeout(() => switchToDropState(), 3000)
                            }}
                            leadID={props?.leadData?.id}
                            getDocumentType={()=>getDocumentType()}
                            fetchAlldocs={()=>fetchExistingDocuments()}
                        />
                    </div>
                </div>    
            }
            { tab === 4 && <div style={{width: '100%',display:'flex', justifyContent:"flex-end",alignItems:"flex-end"}}>
                        <Button
                            leadingIcon={addIcon}
                            text="Add Comment"
                            classes={{
                                background: "#C2185B",
                                borderRadius: "8px",
                                height: "44px",
                            }}
                            textClass={{
                                color: "#FFF",
                                fontSize: "16px",
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                            }}
                            onClick={openCommentBox}
                        />
                    </div> }
            {
                tab === 4  &&
                <div className='activity-container row full-width'>
                      
                    <div className='activity-container column'>
                        <span className='activity-container-heading'>Activity Log</span>
                        <div className='column' style={{gap: 10,marginTop: 16}}>
                        {
                              activities.length > 0 && activities.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.action}                                                
                                                name={item.username}
                                                time={item.timestamp}
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
                    <div className='activity-container-divider' />
                    <div className='activity-container column '>
                        <span className='activity-container-heading'>Comments</span>
                        <div className='column' style={{gap: 10,marginTop: 16}}>
                            {
                              comments?.length > 0 && comments.map((item,index)=>{
                                    return(
                                         <ActivityCard 
                                                title={item.text}
                                                name={item.username}
                                                time={item?.created_at}
                                        />
                                    )
                                })
                            }
                            {
                                commentNoResult && comments?.length === 0 &&
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
                </div>
            }
            {
                tab === 5 &&
                <div className="scrollable-form-container">
                <AccountAndAddress leadID={props?.leadData?.id} token={props?.token} />
                </div>
            }
        </div>
        {
        loader && 
          <div className="credenc-loader-white fullscreen-loader" style={{position:'absolute'}}>
            <TailSpin color="#00BFFF" height={100} width={100}/>
          </div>
        }

            <CommentBoxModal
                visible={isModalVisible}
                onClose={closeCommentBox}
                onSubmit={handleCommentSubmit}
            />
    </div>
  )
}
