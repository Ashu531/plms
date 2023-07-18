import React,{useEffect, useRef, useState} from 'react';
import './/downloads.css'
import axios from 'axios';
import downloadIcon from '../../assets/Icons/downloadIcon.svg'
import DraftTable from '../../components/draftTable/draftTable.jsx';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import Button from '../../components/button/button.jsx';
import moment from 'moment'
import DownloadTable from '../../components/downloadsTable/downloadsTable.jsx';
import { CSVLink,CSVDownload } from "react-csv";
// import { downloadCSV } from '../../helpers/downloadCSV.js';

export default function DownloadPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [csvData,setCsvData] = useState('')

  useEffect(()=>{
    getDownloads()
  },[])

  const getDownloads=async()=>{
    await axios.get(`${API_URL}/api/loan/download/logs/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setTableData(res.data.data)
    }).catch(err=>console.log(err));
  }

  const openLeadForm=()=>{
      props?.openLeadForm()
  }

  const handleStartDate=(value)=>{
    let simplifiedDate = moment(value).format('L');  
    let date = new Date(simplifiedDate) 
    setStartDate(date.valueOf())
  }

  const handleEndDate=(value)=>{
    let simplifiedDate = moment(value).format('L');  
    let date = new Date(simplifiedDate) 
    setEndDate(date.valueOf())
  }

  const generateReport=async()=>{
    await axios.get(`${API_URL}/api/loan/download/report/?start_date=${startDate}&end_date=${endDate}`,{
      headers: {
          token: `${props?.token}`,
      },
    }).
    then(res => {
      getDownloads()
      // window.open("data:text/csv;charset=utf-8," + escape(res.data))
      downloadCSV(res.data)
      return res.data
    }).catch(err=>console.log(err));
  }

  const downloadCSV=(data)=>{
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.csv');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <>
    <div className='download-page'>
          <div
            className="row"
            style={{ margin: "24px 0 0 0" }}
          >
            <div>
              <DatePicker onChange={handleStartDate} value={startDate} />
            </div>
            <span className='conjuction-text'>to</span>
            <div>
              <DatePicker onChange={handleEndDate} value={endDate} />
            </div>
          </div>
          <div className='column' style={{marginTop: 24}}>
          <Button
              leadingIcon={downloadIcon}
              text="Generate Report"
              classes={{
                background: "#8F14CC",
                borderRadius: "8px",
                height: "44px",
              }}
              textClass={{
                color: "#FFF",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
              onClick={()=>generateReport()}
            //   onClick={_openLeadForm}
            >
               <CSVLink data={csvData} target="_blank" id='csvFile' />
            </Button>   
          </div>

          <div className="download-table-container">
              {
                  tableData?.length > 0 ? 
                  <DownloadTable
                        list={[...tableData]}
                        onRowClick={(item, index) => {
                            setLeadInfo(item)
                            openLeadForm()
                        }}
                  /> : 
                  <div className='no-result-content'>
                    <span>No Results</span>
                  </div>
               }
            
          </div>
    </div>
    </>
  )
}
