import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/button/button.jsx";
import crossIcon from "../../assets/Icons/cross-icon.svg";
import cloudIcon from "../../assets/Icons/cloudDropIcon.svg";
import csvIconBlue from "../../assets/Icons/csv-icon-blue.png";
import downloadIcon from "../../assets/Icons/download-icon-blue.svg";
import fileIconGrey from "../../assets/Icons/file-icon-grey.svg";
import axios from "axios";
import './upload.css'

export default function Upload({
    closeUpload,
    headingText='',
    width='',
    height='',
    primaryButtonText='',
    primaryButtonClick,
    secondaryButtonText='',
    secondaryButtonClick,
    disabledButton=false,
    updateFiles,
    token,
    uplaodType,
    showBorder,
    templateText=['Student', 'students'],
    selectedFiles, setSelectedFiles,
    deletedFiles, setDeletedFiles,
    verifiedFiles, setVerifiedFiles,
    removeFile,
    getReferenceId,
    getLeadId,
    getDocumentType
  }) {

  const fileInputField = useRef(null);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const handleSelected = (e) => {
      let tempFiles = [];
      setSelectedFiles([e.target.files[0]]);
      setDeletedFiles([e.target.files[0]]);
      setVerifiedFiles([]);

      e.target.value = null;
  }

  // const downloadFile = () => {
  //   window.open
  // }

  const getFileSize = (size) => {
      const kb = 1024;
      const mb = 1024 * kb;
      if(size < mb){
          return `${(size / kb).toFixed(1)} KB`;
      }

      return `${(size / mb).toFixed(1)} MB`;
  } 

  const handleDrop = (e) => {
      e.stopPropagation();
      e.preventDefault();

      setSelectedFiles([e.dataTransfer.files[0]]);
      setDeletedFiles([e.dataTransfer.files[0]]);
      setVerifiedFiles([]);
      e.dataTransfer.value = null;
  }

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault(e);
    e.dataTransfer.dropEffect = 'copy';
  }

  const verifyFiles = () => {
    setProgress([...selectedFiles.map(e => 0)]);
    setError({status: false, message: ''})
    selectedFiles.forEach(async (file, index) => {
      let data = new FormData();
      data.append('document_file', file);
      data.append('referenceId', getReferenceId())
      data.append('leadId', getLeadId())
      data.append('documentType', getDocumentType())
      data.append('fileName', getDocumentType())
      console.log("upload data", data)
      const res = await axios.post(`${API_URL}/api/loan/upload/documents/`, data, {
        headers: {
          token: `${token}`,
        },
        onUploadProgress: data => {
          let prog = [...progress];
          prog[index] = Math.round((100 * data.loaded) / data.total);
          setProgress([...prog]);
        }
      }).then(res => {
          setVerifiedFiles([...verifiedFiles, res.data.id]);
        })
      .catch(err => {});
    })
  }

  const handleSave = () => {
    primaryButtonClick(verifiedFiles);
  }

  useEffect(() => {
      verifyFiles();
  }, [selectedFiles]);

  useEffect(() => {
    if(deletedFiles.length > 0 && !deletedFiles.find(file => file !== -1)){
      setSelectedFiles([]);
      setDeletedFiles([]);
      setVerifiedFiles([]);
    }
  }, [deletedFiles]);

  return (
    <div 
      className="plms-bulk-upload-container"
      >
      <div
        className="plms-content-box"
        style={{ width: `${width}`, height: `${height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="plms-dialog-body">
            <div className="plms-dropzone" onClick={() => fileInputField.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
                <input type='file' ref={fileInputField} onChange={handleSelected} style={{visibility: 'hidden'}} />
                <img src={cloudIcon} onDragOver={handleDragOver} height={60} width={60} style={{objectFit: 'contain'}}/>
                <div className="title" style={{color: '#6699ff', margin: '1rem 0px 0px'}} onDragOver={handleDragOver}>Drag & Drop files</div>
                <span className='or-text'>or</span>
                <div className="subtitle" style={{fontSize: '16px', margin: '0px 0px 1rem'}} onDragOver={handleDragOver}>Browse Files</div>
            </div>
            {selectedFiles.length > 0 && <div className="plms-file-container">
                {selectedFiles.map((file, i) => (
                    <div key={i} className={`plms-file ${i === selectedFiles.length - 1 ? 'plms-curved-bottom': ''} ${deletedFiles[i] === -1 ? 'plms-deleted' : ''}`} style={showBorder ? {position:'relative',padding: 16}:{position:'relative',padding: '16px 8px'}}>
                        <div className="plms-icon-container" style={{background: 'none'}}>
                            {/* <img src={fileIconGrey} /> */}
                        </div>
                        <div style={{textAlign: 'start', flexGrow: '1', marginLeft: '1.2rem'}}>
                            <div className="plms-title" style={{fontSize: '2rem', color: '#3377ff', textTransform: 'capitalize'}}>{file.name}</div>
                            <div className="plms-subtitle">{getFileSize(file.size)}</div>
                            <div className="plms-status-bar" style={{marginTop: 8}}>
                              <div className={`plms-status ${error.status ? 'plms-error': ''}`} style={{width: `${progress[i]}%`}}></div>
                            </div>
                            <div className="plms-error-text">{error.message}</div>
                        </div>
                        <div className="plms-cross-icon-container">
                            <img src={crossIcon} onClick={() => removeFile(i)} height={24} width={24} style={{objectFit:'contain'}} />
                        </div>
                    </div>
                ))}
            </div>}
        </div>
        <div className="plms-footer">
        </div>
      </div>
    </div>
  );
}
