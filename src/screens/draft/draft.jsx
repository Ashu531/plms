import React,{useEffect, useState} from 'react';
import './/draft.css'
import axios from 'axios';
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import Table from "../../components/table/table.jsx";
import DraftTable from '../../components/draftTable/draftTable.jsx';
import { Bars, TailSpin } from "react-loader-spinner";

export default function DraftPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})
  const [loader,setLoader] = useState(false)
  const [noResult,setNoResult] = useState(false)

  useEffect(()=>{
    getDrafts()
  },[])

  const getDrafts=async()=>{
    setLoader(true)
    await axios.get(`${API_URL}/api/loan/drafts/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
      setLoader(false)
        if(res?.data?.data?.length > 0){
          setTableData(res.data.data)
        }else{
          setNoResult(true)
        }
        
    }).catch(err=>{
      console.log(err)
      setLoader(false)
    });
  }

  const deleteDraft=async(item,index)=>{
    await axios.delete(`${API_URL}/api/loan/lead/draft/${item?.id}/`,{
      headers: {
          token: `${props?.token}`,
      },
  }).
  then(res => {
    getDrafts()
  }).catch(err=>console.log(err));
  }

  const openLeadForm=(item)=>{
      props?.openLeadForm(item)
  }

  return (
    <div className='draft-page'>
          <div
            className="row"
            style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
          >
            <div className="draft-header">SHOWING ALL DRAFT LEADS</div>
          </div>

          <div className="draft-table-container">
              {
                  tableData?.length > 0 &&
                  <DraftTable
                        list={[...tableData]}
                        onRowClick={(item, index) => {
                            setLeadInfo(item)
                            openLeadForm(item)
                        }}
                        onDeleteDraft={(item,index)=>deleteDraft(item,index)}
                  /> 
               }
               {
                 noResult && 
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
  )
}
