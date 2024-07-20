import React, { useEffect } from 'react';
import DetailModal from '../detailModal/detailModal.js';
import './/sliding_panel.css'

export default function SlidingPanel(props) 
{
    return (
        <div className='confirm-modal' >
            <div className='overlay'>
                <div style={{width:'100%',cursor:'pointer',height:'100%'}} onClick={()=>props?.closeSlidingPanel()}>

                </div>
            </div> 
            <div className='confirm-modal-content'>
                <DetailModal 
                  token={props.token}
                  leadData={props?.leadData} 
                  openDetailPage={(item,i)=>props?.openDetailPage(item,i)} 
                  openUserConsentModal={()=>props?.openUserConsentModal()}
                  openUploadModal={()=>props?.openUploadModal()}
                  pendecyData={props?.pendecyData}
                  consent={props?.consent}
                  pendencyResponse={props?.pendencyResponse}
                  openLeadForm={(item) => props?.openLeadForm(item)} 
                  enableEditMode={()=>props?.enableEditMode()}
                  lastActivity={props?.lastActivity}
                />
            </div>
        </div>
    )
}
