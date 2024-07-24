import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/button/button.jsx";
import cloudIcon from "../../assets/Icons/cloudDropIcon.svg";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from "axios";
import './upload.css';

export const uploadtStates = {
  drop: 0,
  preview: 1,
  uploaded: 2
};

export default function Upload({
  width = '',
  height = '',
  token,
  showBorder,
  selectedFiles, setSelectedFiles,
  deletedFiles, setDeletedFiles,
  verifiedFiles, setVerifiedFiles,
  removeFile,
  currentUploadState,
  onDrop,
  onCancel,
  onSave,
  onUpload,
  leadID
}) {
  const fileInputField = useRef(null);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState({ status: false, message: '' });
  const [existingDocuments, setExistingDocuments] = useState([]);

  const handleSelected = (e) => {
    setSelectedFiles([e.target.files[0]]);
    setDeletedFiles([e.target.files[0]]);
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFiles([e.dataTransfer.files[0]]);
    setDeletedFiles([e.dataTransfer.files[0]]);
    e.dataTransfer.value = null;
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const fetchExistingDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${leadID}/documents/`, {
        headers: { 'Token': token }
      });
      setExistingDocuments(response.data.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const uploadFiles = () => {
    selectedFiles.forEach(async (file, index) => {
      let data = new FormData();
      data.append('document_file', file);

      try {
        const response = await axios.post(`${API_URL}/api/loan/v1/loan-lead/${leadID}/documents/`, data, {
          headers: {
            'Token': token,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: data => {
            let prog = [...progress];
            let uploadProgress = Math.round((100 * data.loaded) / data.total);
            prog[index] = uploadProgress;
            setProgress([...prog]);

            if (uploadProgress === 100) {
              const progressInterval = setInterval(() => {
                prog[index] = prog[index] + 1;
                if (prog[index] > 99) {
                  clearInterval(progressInterval);
                } else {
                  setProgress([...prog]);
                }
              }, 600);
            }
          }
        });

        let prog = [...progress];
        prog[index] = 100;
        setProgress([...prog]);
        setVerifiedFiles([...verifiedFiles, response.data.id]);
        onUpload();
      } catch (error) {
        console.error('Upload Error:', error);
        if (error.response) {
          setError({
            status: true,
            message: error.response.data.error
          });
        } else {
          setError({
            status: true,
            message: "Upload failed! Try again."
          });
        }
        let prog = [...progress];
        prog[index] = 0;
        setProgress([...prog]);
      }
    });
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setProgress([...selectedFiles.map(() => 0)]);
      setError({ status: false, message: '' });
      onDrop();
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (deletedFiles.length > 0 && !deletedFiles.find(file => file !== -1)) {
      setSelectedFiles([]);
      setDeletedFiles([]);
      setVerifiedFiles([]);
    }
  }, [deletedFiles]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
  }, []);

  useEffect(() => {
    if (currentUploadState === uploadtStates.drop) {
      setSelectedFiles([]);
    }
  }, [currentUploadState]);

  useEffect(() => {
    fetchExistingDocuments();
  }, [leadID]);

  const renderExistingDocuments = () => {
    return existingDocuments.map((doc, index) => (
      <div key={index} className="existing-document">
        {doc[0] === 'pdf' ? (
          <Document file={`${API_URL}/${doc[1]}`}>
            <Page pageNumber={1} />
          </Document>
        ) : (
          <img className="file-preview" src={`${API_URL}/${doc[1]}`} alt={`${doc[0]} preview`} />
        )}
        <div className="document-type">{doc[0].toUpperCase()}</div>
      </div>
    ));
  };

  return (
    <div className="plms-content-box" style={{ width: `${width}`, height: `${height}` }} onClick={(e) => e.stopPropagation()}>
      {currentUploadState === uploadtStates.drop && (
        <div className="plms-dropzone" onClick={() => fileInputField.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
          <input type='file' accept="image/jpeg,image/jpg,image/png,application/pdf" ref={fileInputField} onChange={handleSelected} style={{ visibility: 'hidden' }} />
          <img src={cloudIcon} height={60} width={60} style={{ objectFit: 'contain' }} />
          <div className="plms-title" style={{ margin: '1rem 0px 0px' }}>Drag & Drop files</div>
          <span className='plms-or-text'>or</span>
          <div className="plms-subtitle" style={{ fontSize: '16px', margin: '0px 0px 1rem' }}>Browse Files</div>
        </div>
      )}
      {currentUploadState !== uploadtStates.drop && selectedFiles.length > 0 && (
        <div className="plms-file-container">
          {selectedFiles.map((file, i) => (
            <div key={i}>
              {file.name.split('.').pop() !== 'pdf' ? (
                <img className="file-preview" src={URL.createObjectURL(file)} alt="preview" />
              ) : (
                <Document file={file} onLoadSuccess={() => {}}>
                  <Page pageNumber={1} />
                </Document>
              )}
              {progress[i] > 0 && <div className="plms-subtitle">{currentUploadState === uploadtStates.uploaded ? 'Uploaded' : 'Uploading'} file: {file.name}</div>}
              {progress[i] > 0 && (
                <div className="plms-status-bar">
                  <div className={`plms-status ${error.status ? 'plms-error' : ''}`} style={{ width: `${progress[i]}%` }}></div>
                  <div className={`plms-status-text`}>{`${progress[i]}%`}</div>
                </div>
              )}
              <div className="plms-error-text">{error.message}</div>
              {(currentUploadState === uploadtStates.preview || error.status) && (
                <div className="row" style={{ justifyContent: 'center', margin: '25px 0 0 0', gap: '10px' }}>
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="existing-documents">
        {renderExistingDocuments()}
      </div>
    </div>
  );
}
