import React, { useEffect,useState } from 'react';
import './/detailModal.css'
import uploadIcon from '../../assets/Icons/uploadIcon.svg'
import pendingIcon from '../../assets/Icons/pendingIcon.svg'
import Button from '../button/button.jsx';
import consentIcon from '../../assets/Icons/consentIcon.svg'
import axios from 'axios';

export default function DetailModal(props) {

  const [pendecyData,setPendecyData] = useState([])
  const [consent,setUserConsent] = useState(false)

   useEffect(()=>{
        getQuickViewData()
        getPendencyData()
   },[])

   const getQuickViewData=async()=>{
        await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,{
            headers: {
                token: `af2ecb4b5b2697d6de6204bf5a4e13c46dcfee27`,
            },
        }).
        then(res => {
            console.log(res.data.data)
        }).catch(err=>console.log(err));
   }

   const getPendencyData=async()=>{
        await axios.get(`${API_URL}/api/loan/pendencies/${props?.leadData?.leadId}/`,{
            headers: {
                token: `af2ecb4b5b2697d6de6204bf5a4e13c46dcfee27`,
            },
        }).
        then(res => {
            handlePendencyData(res.data.data)
            console.log(res.data)
            if(res.data.consent === 'Y'){
                setUserConsent(true)
            }
            // setPendecyData(res.data.data)
        }).catch(err=>console.log(err));
   }
   

   const handlePendencyData=(item)=>{
        let pendencyArr = Object.entries(item);
        let pendencyOriginals = []
        pendencyArr.map((item,index)=>{
            if(item[1] === false)
            pendencyOriginals.push(item[0])
            setPendecyData(pendencyOriginals)
        })
   }

   const goToDetailPage=()=>{
        let i = 1;
        props?.openDetailPage(i);
   }

    return (
        <div className='detail-modal' >
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name row' >
                        <span className='modal-header-name'>{props?.leadData?.fullName}</span>
                        {
                            consent && <img src={consentIcon} style={{marginLeft: 10,objectFit:'contain'}} />
                        }
                    </div>
                    <div className='modal-header-lead'>
                    {props?.leadData?.leadId}
                    </div>
                </div>
                <div className='upload-icon-content'>
                    <img src={uploadIcon} />
                </div>
            </div>
           
            <div className='modal-content'>
                <div className='modal-divider' />
                <div className='column full-width'>
                    <div className='modal-header'>
                        Details
                    </div>
                    <div className='column full-width' style={{marginTop: 12}}>
                        <div className='row full-width'>
                            <span className='table-label'>Mobile Number</span>
                            <span className='table-value'>{props?.leadData?.mobile}</span>
                        </div>
                        <div className='row full-width'>
                            <span className='table-label'>Email</span>
                            <span className='table-value'> {props?.leadData?.emailId}</span>
                        </div>
                    </div>
                </div>
                <div className='modal-divider' style={{margin: '24px 0px'}}/>
                <div className='column full-width'>
                    <div className='modal-header'>
                    Pendencies
                    </div>
                   
                        <div className='column full-width' style={{marginTop: 12}} >
                            {
                                !consent && 
                                <div className='row full-width'>
                                        <div className='row' style={{width: 'auto'}}>
                                                            <div className='pending-icon-content'>
                                                                <img src={pendingIcon} />
                                                            </div>
                                                            <div className='table-label'>Consent</div>
                                        </div>
                                        <div className='table-link' onClick={()=>props?.openUserConsentModal()}>Ask for Consent</div>
                                </div>
                            }
                                    {
                                       pendecyData.length > 0 &&  pendecyData.map((item,index)=>{
                                            return(
                                                <div className='row full-width' key={index}>
                                                        <div className='row' style={{width: 'auto'}}>
                                                            <div className='pending-icon-content'>
                                                                <img src={pendingIcon} />
                                                            </div>
                                                            <div className='table-label'>{item}</div>
                                                        </div>
                                                        <div className='table-link' onClick={()=>props?.openUploadModal()}>Upload Now</div>
                                                </div>
                                             )
                                        })
                                    }
                                    
                        </div>
                </div>
                <div className='modal-divider' style={{margin: '24px 0px'}}/>
                <div className='column full-width'>
                    <div className='modal-header'>
                    Last Update
                    </div>
                   <div className='update-content'>
                        <div className='update-content-header'>
                            {props?.leadData?.status}
                        </div>
                        {/* <div className='row'>
                            <div className='update-text'>
                            Ujjawal Chauhan
                            </div>
                        </div> */}
                   </div>
                </div>
            </div>
            <div className='modal-footer row full-width'>
                <Button
                    text='Edit Details'
                    classes={{
                        borderRadius: 8,
                        border: '1px solid #8F14CC',
                        height: '44px',
                        width: '150px',
                    }}
                    textClass={{
                        color: '#8F14CC',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                    onClick={()=>goToDetailPage()}
                />
                <Button 
                    text='View Full Details'
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '150px',
                    }}
                    textClass={{
                        color: '#FFF',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                    onClick={()=>goToDetailPage()}
                />
            </div>
        </div>
    )
}
