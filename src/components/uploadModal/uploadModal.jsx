import React,{useEffect, useState} from 'react'
import Upload, { uploadtStates } from '../upload/upload.jsx'
import closeIcon from '../../assets/Icons/cross-icon.svg'
import './/uploadModal.css'

export default function UploadModal({
    token,
    closeUploadModal,
    docType,
    borrowerUuid,
    leadId
}) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [verifiedFiles, setVerifiedFiles] = useState([]);

    const [currentUploadState, setCurrentUploadState] = useState(uploadtStates.drop);

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

  return (
   <div className='upload-modal'>
       <div className='upload-modal-content'>
                    <div className='row' style={{border: '1px solid #8F14CC', borderRadius: '8px', height: '560px', justifyContent: 'center'}}>
                        <Upload 
                            showBorder={true} 
                            token={token} 
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            deletedFiles={deletedFiles}
                            setDeletedFiles={setDeletedFiles}
                            verifiedFiles={verifiedFiles}
                            setVerifiedFiles={setVerifiedFiles}
                            removeFile={removeFile}
                            getReferenceId={() => borrowerUuid}
                            getLeadId={() => `LEAD-${leadId}`}
                            getDocumentType={() => docType}
                            currentUploadState={currentUploadState}
                            onDrop={switchToPreviewState}
                            onCancel={() => removeFile(0)}
                            onUpload={() => {
                                switchToUploadedState();
                                setTimeout(() => {
                                    switchToDropState();
                                    closeUploadModal();
                                }, 3000)
                            }}
                        />
                    </div>
                    <div className='closeIcon' onClick={()=>closeUploadModal()}>
                        <img src={closeIcon} height={24} width={24} style={{objectFit:'contain'}} />
                    </div>
       </div>
   </div>
  )
}



