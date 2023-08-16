import React, { useEffect,useState } from 'react';
import './/detailModal.css'
import uploadIcon from '../../assets/Icons/uploadIcon.svg'
import pendingIcon from '../../assets/Icons/pendingIcon.svg'
import Button from '../button/button.jsx';
import consentIcon from '../../assets/Icons/userConsentIcon.svg'
import axios from 'axios';
import { Bars, TailSpin } from "react-loader-spinner";

export default function DetailModal(props) {

   useEffect(()=>{
        getQuickViewData()
   },[])

   const getQuickViewData=async()=>{
        await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,{
            headers: {
                token: `${props?.token}`,
            },
        }).
        then(res => {
            console.log(res.data.data)
        }).catch(err=>console.log(err));
   }

   const goToDetailPage=()=>{
        let i = 1;
        props?.openDetailPage(props?.leadData,i);
   }

    return (
        <div className='detail-modal' >
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name row' >
                        <span className='modal-header-name'>{props?.leadData?.fullName}</span>
                        {
                            props?.consent && <img src={consentIcon} style={{marginLeft: 10,objectFit:'contain'}} />
                        }
                    </div>
                    <div className='modal-header-lead'>
                    {props?.leadData?.leadId}
                    </div>
                </div>
                {/* <div className='upload-icon-content'>
                    <img src={uploadIcon} />
                </div> */}
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
                {props?.pendecyData.length > 0 && <div className='modal-divider' style={{margin: '8px 0px'}}/>}
                
                {
                    props?.pendecyData.length > 0 && 
                    <div className='column full-width'>
                    <div className='modal-header'>
                    Pendencies
                    </div>
                   
                        <div className='column full-width' style={{marginTop: 12}} >
                                    {
                                       props?.pendecyData.map((item,index)=>{
                                            return(
                                                <div className='row full-width' key={index}>
                                                        <div className='row' style={{width: 'auto'}}>
                                                            <div className='pending-icon-content'>
                                                                <img src={pendingIcon} />
                                                            </div>
                                                            <div className='table-label'>{item}</div>
                                                        </div>
                                                        <div className='table-link' onClick={()=> item === 'Consent' ? props?.openUserConsentModal() : props?.openUploadModal()}> { item === 'Consent' ? 'Ask For Consent' : 'Upload Now' } </div>
                                                </div>
                                             )
                                        })
                                    }
                                    
                        </div>
                </div>
                }

                {
                    props?.pendencyResponse &&
                    <div style={{width: '100%'}}>
                        <div className='modal-divider'/>
                        <div className='column full-width' style={{margin: '40px 0px'}}>
                            <div className='modal-header'>
                            Pendencies
                            </div>
                            <div className='column full-width' style={{marginTop: 12}}>
                                <TailSpin color="#0DB78F" height={30} width={30}/>
                            </div>
                        </div>
                        <div className='modal-divider'/>
                    </div>
                }
                
                {props?.pendecyData.length > 0 && <div className='modal-divider' style={{margin: '8px 0px'}}/>}
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
            <div className='modal-footer row full-width' style={{marginTop: 24}}>
                {/* <Button
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
                /> */}
                <Button 
                    text='View Full Details'
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '220px',
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
