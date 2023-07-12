import React, { useEffect,useState } from 'react';
import './/detailModal.css'
import uploadIcon from '../../assets/Icons/uploadIcon.svg'
import pendingIcon from '../../assets/Icons/pendingIcon.svg'
import Button from '../button/button.jsx';
import axios from 'axios';

export default function DetailModal(props) {

  const [pendecyData,setPendecyData] = useState([])

   useEffect(()=>{
        getQuickViewData()
        getPendencyData()
   },[])

   const getQuickViewData=async()=>{
        await axios.get(`${API_URL}/api/loan/overview/${props?.leadData?.leadId}/`,{
            headers: {
                token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
            },
        }).
        then(res => {
            console.log(res.data.data)
        }).catch(err=>console.log(err));
   }

   const getPendencyData=async()=>{
        await axios.get(`${API_URL}/api/loan/pendencies/${props?.leadData?.leadId}/`,{
            headers: {
                token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
            },
        }).
        then(res => {
            handlePendencyData(res.data.data)
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

    return (
        <div className='detail-modal' >
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name'>
                    {props?.leadData?.fullName}
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
                                         pendecyData.map((item,index)=>{
                                            return(
                                                <div className='row full-width' key={index}>
                                                        <div className='row'>
                                                            <div className='pending-icon-content'>
                                                                <img src={pendingIcon} />
                                                            </div>
                                                            <div className='table-label'>{item}</div>
                                                        </div>
                                                        <div className='table-link'>Ask for consent</div>
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
                />
            </div>
        </div>
    )
}
