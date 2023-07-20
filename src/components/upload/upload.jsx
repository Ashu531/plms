import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/button/button.jsx";
import crossIcon from "../../assets/Icons/cross-icon.svg";
import cloudIcon from "../../assets/Icons/cloudDropIcon.svg";
import csvIconBlue from "../../assets/Icons/csv-icon-blue.png";
import downloadIcon from "../../assets/Icons/download-icon-blue.svg";
import fileIconGrey from "../../assets/Icons/file-icon-grey.svg";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from "axios";
import './upload.css';

export const uploadtStates = {
  drop: 0,
  preview: 1,
  uploaded: 2
}

export default function Upload({
    width='',
    height='',
    token,
    showBorder,
    selectedFiles, setSelectedFiles,
    deletedFiles, setDeletedFiles,
    verifiedFiles, setVerifiedFiles,
    removeFile,
    getReferenceId,
    getLeadId,
    getDocumentType,
    currentUploadState,
    onDrop,
    onCancel,
    onSave,
    onUpload
  }) {

  const fileInputField = useRef(null);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const handleSelected = (e) => {
    console.log("on manual click")
      setSelectedFiles([e.target.files[0]]);
      setDeletedFiles([e.target.files[0]]);

      e.target.value = null;
  }

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

      e.dataTransfer.value = null;
  }

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault(e);
    e.dataTransfer.dropEffect = 'copy';
  }

  const uploadFiles = () => {
    selectedFiles.forEach(async (file, index) => {
      let data = new FormData();
      data.append('document_file', file);
      data.append('referenceId', getReferenceId())
      data.append('leadId', getLeadId())
      data.append('documentType', getDocumentType())
      data.append('fileName', getDocumentType())

      const res = await axios.post(`${API_URL}/api/loan/upload/documents/`, data, {
        headers: {
          token: `${token}`,
        },
        onUploadProgress: data => {
          let prog = [...progress];
          let uploadProgress = Math.round((100 * data.loaded) / data.total);
          prog[index] = uploadProgress / 10;
          setProgress([...prog]);

          if(uploadProgress == 100){
              const progressInterval = setInterval(() => {
                  prog[index] = prog[index] + 1;
                  if(prog[index] > 99){
                    clearInterval(progressInterval);
                  } else {
                    setProgress([...prog]);
                  }
              }, 600)
          }
        }
      }).then(res => {
          let prog = [...progress];
          prog[index] = 100;
          setProgress([...prog]);
          setVerifiedFiles([...verifiedFiles, res.data.id]);
          onUpload()
        })
      .catch(err => {
        if(err.response){
          setError({
            status: true,
            message: err.response.data.error
          })
          let prog = [...progress];
          prog[index] = 0;
          setProgress([...prog]);
        } else {
          setError({
            status: true,
            message: "Upload failed! Try again."
          })
        }
      });
    })
  }

  useEffect(() => {
    if(selectedFiles.length > 0){
        setProgress([...selectedFiles.map(e => 0)]);
        setError({status: false, message: ''})
        onDrop()
    }
  }, [selectedFiles]);

  useEffect(() => {
    if(deletedFiles.length > 0 && !deletedFiles.find(file => file !== -1)){
      setSelectedFiles([]);
      setDeletedFiles([]);
      setVerifiedFiles([]);
    }
  }, [deletedFiles]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
  }, [])

  useEffect(() => {
    if(currentUploadState == uploadtStates.drop){
      setSelectedFiles([]);
    }
  }, [currentUploadState])

  return (
      <div
        className="plms-content-box"
        style={{ width: `${width}`, height: `${height}` }}
        onClick={(e) => e.stopPropagation()}
      >
            {currentUploadState == uploadtStates.drop && <div className="plms-dropzone" onClick={() => fileInputField.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
                <input type='file' accept="image/jpeg,image/jpg,image/png,application/pdf" ref={fileInputField} onChange={handleSelected} style={{visibility: 'hidden'}} />
                <img src={cloudIcon} onDragOver={handleDragOver} height={60} width={60} style={{objectFit: 'contain'}}/>
                <div className="title" style={{color: '#6699ff', margin: '1rem 0px 0px'}} onDragOver={handleDragOver}>Drag & Drop files</div>
                <span className='or-text'>or</span>
                <div className="subtitle" style={{fontSize: '16px', margin: '0px 0px 1rem'}} onDragOver={handleDragOver}>Browse Files</div>
            </div>}
            {currentUploadState != uploadtStates.drop && selectedFiles.length > 0 && <div className="plms-file-container">
                {selectedFiles.map((file, i) => (
                    <div>
                        {file.name.split('.').pop() != 'pdf' && <img className="file-preview" src={URL.createObjectURL(file)}/>}
                          {file.name.split('.').pop() == 'pdf' && <Document file={file} onLoadSuccess={() => {}}>
                              <Page pageNumber={1} />
                          </Document>}
                        {progress[i] > 0 && <div className="plms-subtitle">{currentUploadState == uploadtStates.uploaded ? 'Uploaded': 'Uploading'} file: {file.name}</div>}
                        {progress[i] > 0 && <div className="plms-status-bar">
                          <div className={`plms-status ${error.status ? 'plms-error': ''}`} style={{width: `${progress[i]}%`}}></div>
                          <div className={`plms-status-text`}>{`${progress[i]}%`}</div>
                        </div>}
                        <div className="plms-error-text">{error.message}</div>
                        {(currentUploadState == uploadtStates.preview || error.status) && <div className="row" style={{justifyContent: 'center', margin: '25px 0 0 0', gap: '10px'}}>
                            <Button
                                text='Cancel'
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
                                onClick={onCancel}
                            />
                            <Button 
                                text='Save'
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
                                onClick={uploadFiles}
                                disabled={progress[i] > 0}
                            />
                        </div>}
                    </div>
                ))}
            </div>}
      </div>
  );
}
