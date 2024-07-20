import React,{useEffect, useRef, useState} from 'react';
import './downloads.css'
import axios from 'axios';
import downloadIcon from '../../assets/Icons/downloadIcon.svg'
import disabledDownload from '../../assets/Icons/disabledDownload.svg'
import DraftTable from '../../components/draftTable/draftTable.jsx';
import Button from '../../components/button/button.jsx';
import moment from 'moment'
import DownloadTable from '../../components/downloadsTable/downloadsTable.jsx';
import { Bars, TailSpin } from "react-loader-spinner";
import { ReactDatez, ReduxReactDatez } from 'react-datez'
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
  const [startDateValue,setStartDateValue] = useState('');
  const [endDateValue,setEndDateValue] = useState('');
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
      setNoResult(true)
    });
  }

  const openLeadForm=()=>{
      props?.openLeadForm()
  }

  const handleStartDate=(value)=>{
    let simplifiedDate = moment(value);  
    let date = Math.floor(new Date(simplifiedDate).getTime() / 1000)
    setStartDate(simplifiedDate)
    setStartDateValue(date)
  }

  const handleEndDate=(value)=>{
    let simplifiedDate = moment(value);  
    let date = Math.floor(new Date(simplifiedDate).getTime() / 1000)
    setEndDate(simplifiedDate)
    setEndDateValue(date)
  }

  const generateReport=async()=>{
    setNoResult(false)
    setLoader(true)
    await axios.get(`${API_URL}/api/loan/download/report/?start_date=${startDateValue}&end_date=${endDateValue}`,{
      headers: {
          token: `${props?.token}`,
      },
    }).
    then(res => {
      getDownloads()
      downloadCSV(res.data)
      setStartDate('')
      setEndDate('')
      setLoader(false)
      return res.data
    }).catch(err=>{
      console.log(err.response.data.data)
      setLoader(false)
      alert(err.response.data.data)
    });
  }

  const downloadCSV=(data)=>{
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Report:${moment(startDate).format('L')}-${moment(endDate).format('L')}`);
    document.body.appendChild(link);
    link.click();
  }

  const generateIndividualReport=async(item)=>{
    setLoader(true)
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
      setLoader(false)
      return res.data
    }).catch(err=>{
      console.log(err)
      setLoader(false)
      alert(err.response.statusText)
    });
  } 

  const getFilteredDownload=async(id)=>{
    // setNoResult(false)
    if(filterType === id ){
      setFilterType(0)
      getDownloads()
      setStartDate('')
      setEndDate('')
    }else{
      let today = moment()
      if(id === 1){
        setFilterType(id)
        let date = Math.floor(new Date(today).getTime() / 1000)
        setEndDate(today)
        setStartDate(today)
        setStartDateValue(date)
        setEndDateValue(date)
      }else if(id === 2){
        setFilterType(id)
        
        let weekStart = moment().startOf('isoWeek');
        let weekEnd = moment().endOf('isoWeek');
        setEndDate(weekEnd)
        setStartDate(weekStart)
        setStartDateValue(Math.floor(new Date(weekStart).getTime() / 1000))
        setEndDateValue(Math.floor(new Date(weekEnd).getTime() / 1000))
      }else if(id === 3){
        setFilterType(id)
        
        let monthStart = moment().startOf('month');
        let monthEnd = moment().endOf('month');
        setEndDate(monthEnd)
        setStartDate(monthStart)
        setStartDateValue(Math.floor(new Date(monthStart).getTime() / 1000))
        setEndDateValue(Math.floor(new Date(monthEnd).getTime() / 1000))
      }
      
    }
  }

  

  return (
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
              <ReactDatez inputStyle={{height: 30,borderRadius: 8,border: '1px solid #F5EBFF'}} placeholder="DD/MM/YYYY" name="dateInput" handleChange={handleStartDate} value={startDate} allowPast={true} allowFuture={false} />
            </div>
            <span className='conjuction-text'>to</span>
            <div>
              <ReactDatez inputStyle={{height: 30,borderRadius: 8,border: '1px solid #F5EBFF'}} placeholder="DD/MM/YYYY" name="dateInput" handleChange={handleEndDate} value={endDate} allowPast={true} allowFuture={false} />
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
              <div className="download-credenc-loader-white download-fullscreen-loader">
                <TailSpin color="#00BFFF" height={100} width={100}/>
              </div>
          }
    </div>
  )
}
