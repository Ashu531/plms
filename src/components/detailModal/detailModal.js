import React, { useEffect, useState } from 'react';
import './detailModal.css';
import uploadIcon from '../../assets/Icons/uploadIcon.svg';
import pendingIcon from '../../assets/Icons/pendingIcon.svg';
import Button from '../button/button.jsx';
import axios from 'axios';
import { Bars, TailSpin } from 'react-loader-spinner';
import ActivityCard from '../activityCard/activityCard.jsx';

export default function DetailModal(props) {

    // useEffect(() => {
    //     getQuickViewData();
    // }, []);

    // const getQuickViewData = async () => {
    //     await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`, {
    //         headers: {
    //             token: `${props?.token}`,
    //         },
    //     })
    //     .then(res => {
    //         console.log(res.data.data);
    //     })
    //     .catch(err => console.log(err));
    // };

    const goToDetailPage = () => {
        let i = 1;
        props?.openDetailPage(props?.leadData, i);
    };

    return (
        <div className='detail-modal'>
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name row'>
                        <span className='modal-header-name'>{props?.leadData?.student_name}</span>
                    </div>
                    <div className='modal-header-lead'>
                        {props?.leadData?.application_id}
                    </div>
                </div>
                {/* <div className='upload-icon-content'>
                    <img src={uploadIcon} alt="Upload Icon" />
                </div> */}
            </div>
           
            <div className='modal-content'>
                <div className='modal-divider' />
                <div className='column full-width'>
                    <div className='modal-header'>Details</div>
                    <div className='column full-width' style={{ marginTop: 12 }}>
                        <div className='row full-width'>
                            <span className='table-label'>Mobile Number</span>
                            <span className='table-value'>{props?.leadData?.applicant_phone}</span>
                        </div>
                        <div className='row full-width'>
                            <span className='table-label'>Email</span>
                            <span className='table-value'>{props?.leadData?.applicant_email}</span>
                        </div>
                    </div>
                </div>
                <div className='modal-divider' style={{ margin: '8px 0px' }} />
                {
                    props?.pendencyResponse &&
                    <div style={{ width: '100%' }}>
                        <div className='modal-divider'/>
                        <div className='column full-width' style={{ margin: '40px 0px' }}>
                            <div className='modal-header'>Pendencies</div>
                            <div className='column full-width' style={{ marginTop: 12 }}>
                                <TailSpin color="#0DB78F" height={30} width={30} />
                            </div>
                        </div>
                        <div className='modal-divider'/>
                    </div>
                }
                <div className='column full-width'>
                    <div className='modal-header'>Last Update</div>
                    <div className='update-content' style={{flexDirection: "row",justifyContent:"space-between"}}>
                        <div className='update-content-header'>
                            Status
                        </div>
                        <div className='update-content-header'>
                            <b>{props?.lastActivity?.last_lead_status}</b>
                        </div>
                    </div>
                    <div style={{marginTop : 16, width: '100%'}}>
                        <ActivityCard 
                            title={props?.lastActivity?.last_activity.action}
                            name={props?.lastActivity?.last_activity.user}
                            time={props?.lastActivity?.last_activity.timestamp}
                        />
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
                        width: '40%',
                    }}
                    textClass={{
                        color: '#8F14CC',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                    onClick={() => {
                        props?.enableEditMode();
                        props?.openLeadForm(props?.leadData);
                    }}
                />
                <Button
                    text='View Full Details'
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '40%',
                    }}
                    textClass={{
                        color: '#FFF',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                    onClick={() => goToDetailPage()}
                />
            </div>
        </div>
    );
}
