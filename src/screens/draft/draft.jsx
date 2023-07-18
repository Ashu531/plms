import React,{useEffect, useState} from 'react';
import './/draft.css'
import axios from 'axios';
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import Table from "../../components/table/table.jsx";
import DraftTable from '../../components/draftTable/draftTable.jsx';

export default function DraftPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})

  useEffect(()=>{
    getDrafts()
  },[])

  const getDrafts=async()=>{
    await axios.get(`${API_URL}/api/loan/drafts/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        console.log(res)
        setTableData(res.data.data)
    }).catch(err=>console.log(err));
  }

  const openLeadForm=()=>{
      props?.openLeadForm()
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
                  tableData?.length > 0 ? 
                  <DraftTable
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
  )
}
