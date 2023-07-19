import React,{useEffect, useState} from 'react'
import Upload from '../upload/upload.jsx'
import closeIcon from '../../assets/Icons/cross-icon.svg'
import './/uploadModal.css'

export default function UploadModal(props) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [verified, setVerified] = useState(false);
    const [verifiedFiles, setVerifiedFiles] = useState([]);

    const removeFile = (i) => {
        let selected = [...deletedFiles];
        
        selected.forEach((file, idx) => {
        if(idx == i)
            selected[idx] = -1;
        });

        setDeletedFiles([...selected]);
        setVerifiedFiles([]);
    }

  return (
   <div className='upload-modal'>
       <div className='upload-modal-content'>
                    <div className='row'>
                        <Upload 
                            showBorder={false} 
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            deletedFiles={deletedFiles}
                            setDeletedFiles={setDeletedFiles}
                            verifiedFiles={verifiedFiles}
                            setVerifiedFiles={setVerifiedFiles}
                            removeFile={removeFile}
                        />
                    </div>
                    <div className='closeIcon' onClick={()=>props?.closeUploadModal()}>
                        <img src={closeIcon} height={24} width={24} style={{objectFit:'contain'}} />
                    </div>
       </div>
   </div>
  )
}



