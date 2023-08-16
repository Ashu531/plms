import React,{useEffect, useState} from 'react';
import './/draft.css'
import axios from 'axios';
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import Table from "../../components/table/table.jsx";
import DraftTable from '../../components/draftTable/draftTable.jsx';
import { Bars, TailSpin } from "react-loader-spinner";
import DraftSearchTable from '../../components/draftSearchTable/draftSearchTable.jsx';
import Search from '../../components/search/search.jsx';

export default function DraftPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})
  const [loader,setLoader] = useState(false)
  const [noResult,setNoResult] = useState(false)
  const [draftQuery,setDraftQuery] = useState('')
  const [draftSearchData,setDraftSearchData] = useState([])

  useEffect(()=>{
      getDrafts()
  },[props?.draftSaved])

  const getDrafts=async()=>{
    setLoader(true)
    await axios.get(`${API_URL}/api/loan/drafts/`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
      setLoader(false)
        setTableData(res.data.data)
        
        if(res?.data?.data?.length == 0){
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
  }).catch(err=>{
    console.log(err.response.data)
    alert(err.response.data.error)
  });
  }

  const openLeadForm=(item)=>{
      props?.openLeadForm(item)
  }

  const onDraftSearch=(query)=>{
    // if(query.length > 0){
    //   setLoader(true)
    // }else{
    //   setLoader(false)
    //   setNoResult(false)
    // }
    
    setDraftQuery(query);
    // setSearchCount(0)
    // setSearchData([])
  }

  const handleDraftSearch = async(query) => {
    //search api here
    await axios.get(`${API_URL}/api/loan/search/draft/?type=${query}`,{
        headers: {
            token: `${props?.token}`,
        },
    }).
    then(res => {
        if(res?.data?.data?.length > 0){
            let detail = res?.data?.data;
            setLoader(false)
            setDraftSearchData(detail)
            // setSearchCount(res?.data?.data?.count)
            setNoResult(false)
        }
        else{
            setLoader(false)
            setNoResult(true)
            // setSearchCount(0)
            setDraftSearchData([])
        }
        
    }).catch(err=>console.log(err));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDraftSearchData([])
        if(draftQuery?.length > 0){
          setTableData([])
          handleDraftSearch(draftQuery);
        }else{
          setNoResult(false)
          getDrafts()
        }
     }, 500);

    return () => clearTimeout(delayDebounce);
  }, [draftQuery]);

  return (
    <div className='draft-page'>
          <div className='draft-page-header'>
              <Search 
                placeholder={'Search for Draft Leads'}
                onChange={onDraftSearch}
              />
          </div>
          <div
            className="row"
            style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
          >
            <div className="draft-header">SHOWING ALL DRAFT LEADS</div>
          </div>

          <div className="draft-table-container">
              {
                draftQuery.length === 0 &&  tableData?.length > 0 &&
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
               draftQuery?.length > 0 && draftSearchData && draftSearchData?.length > 0 &&
                <DraftSearchTable
                        list={draftSearchData}
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
