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
  }) {

  const fileInputField = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [verified, setVerified] = useState(false);
  const [verifiedFiles, setVerifiedFiles] = useState([]);
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

  const removeFile = (i) => {
      let selected = [...deletedFiles];
      
      selected.forEach((file, idx) => {
        if(idx == i)
          selected[idx] = -1;
      });

      setDeletedFiles([...selected]);
      setVerifiedFiles([]);
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
      if (uplaodType === 'bulk_optional_students') {
        data.append(`${'attach_students'}`, file);
      } else data.append(`${uplaodType}`, file);
      const res = await axios.post(`${API_URL}/api/loan/upload/documents/`, data, {
        headers: {
          token: `082daf7e87044f5a49b39d53e0ae794faa6e119d`,
        },
        onUploadProgress: data => {
          let prog = [...progress];
          prog[index] = Math.round((100 * data.loaded) / data.total);
          setProgress([...prog]);
        }
      }).then(res => {
          setVerifiedFiles([...verifiedFiles, res.data.id]);
        })
      .catch(err => setError({status: true, message: err.response.data.errors[0]}));
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
      className="bulk-upload-container" 
      // onClick={() => closeUpload(false)} 
      // style={showBorder ? { border: '1px solid #8F14CC'} : null}
      >
      <div
        className="content-box"
        style={{ width: `${width}`, height: `${height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="header">
          <span className="heading">{headingText}</span>
          <div className="cross-icon-wrapper">
            <img
              onClick={() => closeUpload(false)}
              style={{ height: "2.4rem" }}
              alt="cross icon"
              src={crossIcon}
            ></img>
          </div>
        </div> */}
        <div className="dialog-body">
            {/* <div className="template">
                <img src={csvIconBlack}/>
                <div style={{textAlign: 'start', flexGrow: '1', marginLeft: '1.6rem'}}>
                    <div className="title">{templateText[0]} File Template</div>
                    <div className="subtitle">Use this format to upload {templateText[1]} in bulk</div>
                </div>
                {uplaodType === 'bulk_students_two' ? <a href='https://credenc-fms-school.s3.ap-south-1.amazonaws.com/Upload%2BCSV%2B(Sample).csv' download="Sample.csv" ><img src={downloadIcon}/></a> :
                uplaodType === 'bulk_optional_students' ? <a href='https://credenc-fms-school.s3.ap-south-1.amazonaws.com/Optional%2BStudents(Sample).csv' download="Sample.csv" ><img src={downloadIcon}/></a> :
                uplaodType === 'bulk_courses' ? <a href='https://credenc-fms-school.s3.ap-south-1.amazonaws.com/Bulk%2BCourse(Sample).csv' download="Sample.csv" ><img src={downloadIcon}/></a> :
                <a href='https://credenc-fms-school.s3.ap-south-1.amazonaws.com/Bulk%2BBatch(Sample).csv' download="Sample.csv" ><img src={downloadIcon}/></a>}
            </div> */}
            <div className="dropzone" onClick={() => fileInputField.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
                <input type='file' ref={fileInputField} onChange={handleSelected} style={{visibility: 'hidden'}} />
                <img src={cloudIcon} onDragOver={handleDragOver} height={60} width={60} style={{objectFit: 'contain'}}/>
                <div className="title" style={{color: '#6699ff', margin: '1rem 0px 0px'}} onDragOver={handleDragOver}>Drag & Drop files</div>
                <span className='or-text'>or</span>
                <div className="subtitle" style={{fontSize: '16px', margin: '0px 0px 1rem'}} onDragOver={handleDragOver}>Browse Files</div>
                {/* <Button 
                    type="primary"
                    buttonText="Upload"
                    onClick={() => {}}
                    disabledButton={false}
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '150px',
                    }}
                /> */}
            </div>
            {selectedFiles.length > 0 && <div className="file-container">
                {selectedFiles.map((file, i) => (
                    <div key={i} className={`file ${i === selectedFiles.length - 1 ? 'curved-bottom': ''} ${deletedFiles[i] === -1 ? 'deleted' : ''}`} style={showBorder ? {position:'relative',padding: 16}:{position:'relative',padding: '16px 8px'}}>
                        <div className="icon-container" style={{background: 'none'}}>
                            {/* <img src={fileIconGrey} /> */}
                        </div>
                        <div style={{textAlign: 'start', flexGrow: '1', marginLeft: '1.2rem'}}>
                            <div className="title" style={{fontSize: '2rem', color: '#3377ff', textTransform: 'capitalize'}}>{file.name}</div>
                            <div className="subtitle">{getFileSize(file.size)}</div>
                            <div className="status-bar" style={{marginTop: 8}}>
                              <div className={`status ${error.status ? 'error': ''}`} style={{width: `${progress[i]}%`}}></div>
                            </div>
                            <div className="error-text">{error.message}</div>
                        </div>
                        <div className="cross-icon-container">
                            <img src={crossIcon} onClick={() => removeFile(i)} height={24} width={24} style={{objectFit:'contain'}} />
                        </div>
                    </div>
                ))}
            </div>}
        </div>
        <div className="footer">
          {/* <Button
            type="primary"
            buttonText={primaryButtonText}
            disabledButton={verifiedFiles.length === 0}
            onClick={handleSave}
            classes={{
                background: '#8F14CC',
                borderRadius: '8px',
                height: '44px',
                width: '150px',
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
