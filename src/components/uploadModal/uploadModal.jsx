import React,{useEffect, useState} from 'react'
import Upload from '../upload/upload.jsx'
import closeIcon from '../../assets/Icons/cross-icon.svg'
import './/uploadModal.css'

export default function UploadModal(props) {
  return (
   <div className='upload-modal'>
       <div className='upload-modal-content'>
                    <div className='row'>
                        <Upload showBorder={false} />
                    </div>
                    <div className='closeIcon' onClick={()=>props?.closeUploadModal()}>
                        <img src={closeIcon} height={24} width={24} style={{objectFit:'contain'}} />
                    </div>
       </div>
   </div>
  )
}



