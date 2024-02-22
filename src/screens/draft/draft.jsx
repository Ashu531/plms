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
import ConfirmationModal from '../../components/confirmationModal/confirmationModal.jsx';

export default function DraftPage(props) {

  const [tableData,setTableData] = useState([])
  const [leadInfo,setLeadInfo] = useState({})
  const [loader,setLoader] = useState(false)
  const [noResult,setNoResult] = useState(false)
  const [draftQuery,setDraftQuery] = useState('')
  const [draftSearchData,setDraftSearchData] = useState([])
  const [confirmationModal,setConfirmationModal] = useState(false)
  const [currentLead,setCurrentLead] = useState({})

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

  const deleteDraft=async()=>{
    await axios.delete(`${API_URL}/api/loan/lead/draft/${currentLead?.id}/`,{
      headers: {
          token: `${props?.token}`,
      },
  }).
    then(res => {
      getDrafts()
      props?.getDraftInfo()
    }).catch(err=>{
      console.log(err.response.data)
      alert(err.response.data.error)
    });
    closeConfirmationModal()
  }

  const openLeadForm=(item)=>{
      props?.openLeadForm(item)
  }

  const onDraftSearch=(query)=>{
    setDraftQuery(query);
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
            setNoResult(false)
        }
        else{
            setLoader(false)
            setNoResult(true)
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

  const removeDraftSearchQuery=()=>{
    setDraftQuery('')
  }

  const closeConfirmationModal=()=>{
    setCurrentLead({})
    setConfirmationModal(false)
  }
  
  const openConfirmationModal=(item,index)=>{
    setCurrentLead(item)
    setConfirmationModal(true)
  }

  return (
    <div className='draft-page'>
          <div className='draft-page-header'>
              <Search 
                placeholder={'Search for Draft Leads'}
                onChange={onDraftSearch}
                query={draftQuery}
                removeSearchQuery={()=>removeDraftSearchQuery()}
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
                        onDeleteDraft={(item,index)=>openConfirmationModal(item,index)}
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
                        onDeleteDraft={(item,index)=>openConfirmationModal(item,index)}
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
            confirmationModal && 
            (
              <ConfirmationModal
                closeConfirmationModal={() => closeConfirmationModal()}
                onDeleteDraft={()=>deleteDraft()}
                title="Delete financing lead"
                instruction='Are you sure you want to delete the loan lead draft?'
                description='By deleting the recorded will be removed and if the student had applied  for the loan it will get cancelled.'
                primaryButtonText='Delete'
                secondaryButtonText='Cancel'
              />
            )
          }
          {
            loader && 
              <div className="credenc-loader-white fullscreen-loader">
                <TailSpin color="#00BFFF" height={100} width={100}/>
              </div>
          }
    </div>
  )
}
