import React,{useEffect, useRef, useState} from 'react';
import './/downloads.css'
import axios from 'axios';
import downloadIcon from '../../assets/Icons/downloadIcon.svg'
import disabledDownload from '../../assets/Icons/disabledDownload.svg'
import DraftTable from '../../components/draftTable/draftTable.jsx';
import DatePicker from 'react-date-picker';
import Button from '../../components/button/button.jsx';
import moment from 'moment'
import DownloadTable from '../../components/downloadsTable/downloadsTable.jsx';
import { Bars, TailSpin } from "react-loader-spinner";
// import { downloadCSV } from '../../helpers/downloadCSV.js';

const filter = [
  {
    id: 1,
    value: 'Today'
  },
  {
    id: 2,
    value: 'This Week'
  },
  {
    id: 3,
    value: 'This Month'
  }

]

export default function DownloadPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [csvData,setCsvData] = useState('')
  const [loader,setLoader] = useState(false)
  const [noResult,setNoResult] = useState(false)
  const [filterType,setFilterType] = useState(0)

  useEffect(()=>{
    getDownloads()
  },[])

  const getDownloads=async()=>{
    setLoader(true)
    await axios.get(`${API_URL}/api/loan/download/logs/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        setLoader(false)
        if(res?.data?.data?.length > 0){
          setTableData(res.data.data)
          setNoResult(false)
        }else{
          setTableData([])
          setNoResult(true)
        }
    }).catch(err=>{
      setLoader(false)
    });
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
      downloadCSV(res.data)
      setStartDate('')
      setEndDate('')
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

  const generateIndividualReport=async(item)=>{
    let startDate = item?.from_date;
    let endDate = item?.to_date;
    await axios.get(`${API_URL}/api/loan/download/report/?start_date=${startDate}&end_date=${endDate}`,{
      headers: {
          token: `${props?.token}`,
      },
    }).
    then(res => {
      // getDownloads()
      downloadCSV(res.data)
      return res.data
    }).catch(err=>console.log(err));
  } 

  const getFilteredDownload=async(id)=>{
    if(filterType === id ){
      setFilterType(0)
      getDownloads()
    }else{
      setFilterType(id)
      setLoader(true)
      await axios.get(`${API_URL}/api/loan/download/logs/?date_type=${id}`,{
          headers: {
              token: `${props?.token}`,
          },
      }).
      then(res => {
          setLoader(false)
          console.log(res.data)
          if(res?.data?.data?.length > 0){
            setTableData(res.data.data)
          }else{
            setTableData([])
            setNoResult(true)
          }
      }).catch(err=>{
        setLoader(false)
      });
    }

    
  }

  return (
    <>
    <div className='download-page'>
         <div className='row' style={{gap: '12px'}}>
               
               {
                 filter.map((item,index)=>{
                   return(
                     <div className='date-filter-container' style={filterType === item.id ? {background: '#F5EBFF',cursor: 'pointer'} : {background: '#FFFFFF',cursor: 'pointer'}}>
                       <div className='date-filter-text' onClick={()=>getFilteredDownload(item.id)}>
                         {item.value}
                       </div>
                   </div>
                   )
                 })
               }
                 
             
         </div>
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
              leadingIcon={startDate && endDate ? downloadIcon : disabledDownload}
              text="Generate Report"
              classes={startDate && endDate ? {
                background: "#8F14CC",
                borderRadius: "8px",
                height: "44px",
              }: {
                background: "#F4F4F4",
                borderRadius: "8px",
                height: "44px",
              }}
              textClass={startDate && endDate ? {
                color: "#FFF",
                fontSize: "14px",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }:{
                color: "#B9B9B9",
                fontSize: "14px",
                fontFamily: "Montserrat",
                fontWeight: 500,
                opacity: 0.5
              }}
              onClick={()=>startDate && endDate ? generateReport() : {}}
            //   onClick={_openLeadForm}
            /> 
          </div>
          <div className='downloads-header'>Previous Downloads</div>
          <div className="download-table-container">
              {
                  tableData?.length > 0 &&
                  <DownloadTable
                        list={[...tableData]}
                        generateReport={(item)=>generateIndividualReport(item)}
                        // onRowClick={(item, index) => {
                        //     setLeadInfo(item)
                        //     openLeadForm()
                        // }}
                  /> 
              }

              { noResult && 
               <div className='no-result-content'>
                  <span>No Results</span>
               </div>
              }  
                 
               
            
          </div>
          {
            loader && 
              <div className="credenc-loader-white fullscreen-loader">
                <TailSpin color="#00BFFF" height={100} width={100}/>
              </div>
          }
    </div>
    </>
  )
}
