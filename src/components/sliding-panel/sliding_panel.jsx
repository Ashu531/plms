import React, { useEffect } from 'react';
import DetailModal from '../detailModal/detailModal.jsx';
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
                <DetailModal />
            </div>
        </div>
    )
}