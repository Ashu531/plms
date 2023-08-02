import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import Status from "../../components/status/status.jsx";
import "./home.css";
import Table from "../../components/table/table.jsx";
import SearchTable from "../../components/searchTable/table.jsx";
import Header from "../../components/header/header.jsx";
import SlidingPanel from "../../components/sliding-panel/sliding_panel.jsx";
import LeadForm from "../../components/leadForm/leadform.jsx";
import axios from 'axios';
import DetailPage from "../detail/detail.jsx";
import UserConsentModal from "../../components/userConsentModal/userConsentModal.jsx";
import DraftPage from "../draft/draft.jsx";
import UploadModal from "../../components/uploadModal/uploadModal.jsx";
import DownloadPage from "../downloads/downloads.jsx";
import { getProfileData } from "../../helpers/apis.js";
import { Bars, TailSpin } from "react-loader-spinner";

const statuses = [
  {
    boldText: "All",
    selected: true,
    count: 0
  },
  {
    boldText: "Incomplete",
    selected: false,
    count: 0
  },
  {
    boldText: "In Process",
    selected: false,
    count: 0
  },
  {
    boldText: "Closed",
    selected: false,
    count: 0
  },
  {
    boldText: "Approved",
    selected: false,
    count: 0
  },
  {
    boldText: "Disbursed",
    selected: false,
    count: 0
  },
];

const statusIndices = {
  ALL: 0,
  INCOMPLETE: 1,
  IN_PROCESS: 2,
  CLOSED: 3,
  APPROVED: 4,
  DISBURSED: 5
}

const statusEndpoints = {
  ALL: 'all/',
  INCOMPLETE: 'incomplete/',
  IN_PROCESS: 'inprocess/',
  CLOSED: 'rejected/',
  APPROVED: 'approved/',
  DISBURSED: 'disbursed/'
}



export default function Home({token}) {


  const initialFormState = {
      leadId: '',
      studentName: '',
      institute: '',
      mobile: '',
      email: '',
      borrowerName: '',
      course: '',
      courseFee: '',
      loanAmount: '',
      tenure: '',
      advanceEmi: '-1'
  }

  const [query, setQuery] = useState("");
  const [leadInfo,setLeadInfo] = useState({})
  const [openPanel, setOpenPanel] = useState(false);
  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [screen, setScreen] = useState(0);
  const [searchData,setSearchData] = useState([])
  const [searchCount,setSearchCount] = useState(0);
  const [consentModal, setConsentModal] = useState(false);
  const [tableData,setTableData] = useState(Array(6).fill([]))
  const [statusList, setStatusList] = useState([...statuses]);
  const [statusCount,setStatusCount] = useState(0)
  const [uploadModal,setUploadModal] = useState(false)
  const [noResult,setNoResult] = useState(false)
  const [leadOverview,setLeadOverview] = useState()
  const [formData, setFormData] = useState({...initialFormState});
  const [temporaryFormData, setTemporaryFormData] = useState();
  const [profile, setProfile] = useState({});
  const [pendecyData,setPendecyData] = useState([])
  const [consent,setUserConsent] = useState(false)
  const [loader,setLoader] = useState(false)
  const [turnOnButtonLoader,setTurnOnButtonLoader] = useState({
    status : false,
    data : {}
  })
  const [pendencyResponse,setPendencyResponse] = useState(false)
  const [draftSaved,setDraftSaved] = useState(false)

  const getProfileInfo = async () => {
    const data = await getProfileData(token);
    setProfile(data);
  }

  const openSlidingPanel = () => {
    setOpenPanel(true);
  };

  const closeSlidingPanel = () => {
    // setLeadInfo({});
    setOpenPanel(false);
  };

  const _openLeadForm = (data) => {

    if(data){
      const formData = {
        leadId: `${data?.lead_id}`,
        studentName: `${data?.student_name}`,
        institute: `${data?.college_name}`,
        mobile: `${data?.applicant_phone}`,
        email: `${data?.applicant_email}`,
        borrowerName: `${data?.borrower_name}`,
        course: `${data?.course}`,
        courseFee: `${data?.course_fee}`,
        loanAmount: `${data?.loan_amount}`,
        tenure: `${data?.tenure}`,
        advanceEmi: `${data?.advance_emi}`,
        id: `${data?.id}`
      }
      setFormData({...formData});
      setTemporaryFormData({...formData});
    }

    setOpenLeadForm(true);
  };

  const _closeLeadForm = () => {
    setOpenLeadForm(false);
  };

  ///////////////////////////////////////////////////////////////
  // Search Start

  const onSearch = async (query) => {
    if(query.length > 0){
      setLoader(true)
    }else{
      setLoader(false)
      setNoResult(false)
    }
    
    setQuery(query);
    setSearchCount(0)
    setSearchData([])
  };

  const handleSearch = async(query) => {
    //search api here
    await axios.get(`${API_URL}/api/loan/search/filter/?search=${query}`,{
        headers: {
            token: `${token}`,
        },
    }).
    then(res => {
        if(res?.data?.data?.leads?.length > 0){
            let detail = res?.data?.data?.leads;
            setLoader(false)
            setSearchData(detail)
            setSearchCount(res?.data?.data?.totalCount)
            setNoResult(false)
        }else{
            setLoader(false)
            setNoResult(true)
            setSearchCount(0)
            setSearchData([])
        }
        
    }).catch(err=>console.log(err));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if(query?.length > 0){
            handleSearch(query);
        }
     }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Search End
  //////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////
  // Status Start

  const getSelectedStatusIndex = () => {
    let index = statusList.findIndex(status => status.selected == true)
    if(index == -1){
      throw 'Some error occurred';
    }

    return index;
  }

  const handleStatusChange = (status, index) => {
    
    let newStatusList = [...statusList];
    
    newStatusList.forEach((status, i) => {
      if (i == index) {
        newStatusList[i]["selected"] = true;
      } else {
        newStatusList[i]["selected"] = false;
      }
    });

    setStatusList([...newStatusList]);
    setStatusCount(status?.count)
  };

  const updateStatusList = (count, index) => {
    let newStatusList = [...statusList];
    newStatusList[index] = {...newStatusList[index], count: count}
    setStatusList(newStatusList);
  }

  const updateTableData = (data, index) => {

    let newData = [...tableData];
    newData[index] = data;

    setTableData(newData);

  }

  const getTableData = async (index) => {
    setLoader(true)
    let endpoint;

    switch(index){
      case statusIndices.ALL: endpoint = statusEndpoints.ALL; 
          break;
      case statusIndices.INCOMPLETE: endpoint = statusEndpoints.INCOMPLETE; 
          break;
      case statusIndices.IN_PROCESS: endpoint = statusEndpoints.IN_PROCESS; 
          break;
      case statusIndices.CLOSED: endpoint = statusEndpoints.CLOSED; 
          break;
      case statusIndices.APPROVED: endpoint = statusEndpoints.APPROVED; 
          break;
      case statusIndices.DISBURSED: endpoint = statusEndpoints.DISBURSED; 
          break;
    }

    return await axios.get(`${API_URL}/api/loan/${endpoint}`,{
        headers: {
            token: `${token}`,
        },
    }).
    then(res => {
        if(res?.status === 200){
            if(endpoint === statusEndpoints.ALL){
                setStatusCount(res?.data?.data?.totalCount)
            }
            return res.data.data;
        }
        
    }).catch(err=>{
        if(err.response.status !== 200){
            setNoResult(true)
            setLoader(false)
        }
    });
  }

  // Status End
  //////////////////////////////////////////////////////////////////


  const resetDetailsPage = () => {
    setLeadOverview(null);
    setFormData({...initialFormState});
    setTemporaryFormData({...initialFormState});
  }

  const navigatePage = (i) => {
    setQuery('')
    setLoader(false)

    if(i == 0){
      resetDetailsPage();
    }

       closeSlidingPanel()
       setScreen(i);
  };

  const closeUserConsentModal = () => {
    setConsentModal(false);
  };

  useEffect(() => {
    if(screen === 0){
      setLeadInfo({});
    }
  }, [screen])

  const getLeadsAndCount = async (data) => {
    return await data;
  }

  const updateScreen = async () => {
    setLoader(false)
    let allData = getTableData(statusIndices.ALL);
    let incompleteData = getTableData(statusIndices.INCOMPLETE);
    let inProcessData = getTableData(statusIndices.IN_PROCESS);
    let closedData = getTableData(statusIndices.CLOSED);
    let approvedData = getTableData(statusIndices.APPROVED);
    let disbursedData = getTableData(statusIndices.DISBURSED);

    let newTableData = [...tableData];
    let newStatusList = [...statusList];

    allData = await allData;
        newTableData[statusIndices.ALL] = allData?.leads;
        newStatusList[statusIndices.ALL] = {...newStatusList[statusIndices.ALL], count: allData?.count}

    incompleteData = await incompleteData;
      newTableData[statusIndices.INCOMPLETE] = incompleteData?.leads;
      newStatusList[statusIndices.INCOMPLETE] = {...newStatusList[statusIndices.INCOMPLETE], count: incompleteData?.count}

    inProcessData = await inProcessData;
        newTableData[statusIndices.IN_PROCESS] = inProcessData?.leads;
        newStatusList[statusIndices.IN_PROCESS] = {...newStatusList[statusIndices.IN_PROCESS], count: inProcessData?.count}
 

    closedData = await closedData;
      newTableData[statusIndices.CLOSED] = closedData?.leads;
      newStatusList[statusIndices.CLOSED] = {...newStatusList[statusIndices.CLOSED], count: closedData?.count}
 

    approvedData = await approvedData;
      newTableData[statusIndices.APPROVED] = approvedData?.leads;
      newStatusList[statusIndices.APPROVED] = {...newStatusList[statusIndices.APPROVED], count: approvedData?.count}


    disbursedData = await disbursedData;
      newTableData[statusIndices.DISBURSED] = disbursedData?.leads;
      newStatusList[statusIndices.DISBURSED] = {...newStatusList[statusIndices.DISBURSED], count: disbursedData?.count}


    setTableData(newTableData);
    setStatusList(newStatusList);
    setLoader(false)
  }

  useEffect(() => {
        updateScreen()
        // getQuickViewData()
  }, [])

  const openUserConsentModal = () => {
    closeSlidingPanel()
    setConsentModal(true);
  };

  const getQuickViewData=async(leadData)=>{
    await axios.get(`${API_URL}/api/loan/overview/${leadData?.leadId}/`,{
        headers: {
            token: `${token}`,
        },
    }).
    then(res => {
        submitConsent(res?.data?.data)
        const resData = res?.data?.data?.data?.borrowerData;
        setLeadOverview(resData)
        let data = {
          leadId: `${resData?.leadId}`,
          studentName: `${resData?.studentFirstName} ${resData?.studentMiddleName + ' '}${resData?.studentLastName}`,
          institute: profile.college,
          mobile: `${resData?.mobile}`,
          email: `${resData?.email}`,
          borrowerName: `${resData?.borrowerName}`,
          course: `${resData?.courseName}`,
          courseFee: `${resData?.courseFee}`,
          loanAmount: `${resData?.loanRequired}`,
          tenure: `${resData?.tenor}`,
          advanceEmi: `${resData?.advanceEmi}`
      }
      setFormData({...data});
      setTemporaryFormData({...data});
      setTurnOnButtonLoader({
        status: false,
        data : {}
      })
    }).catch(err=>console.log(err));
  }

  const submitConsent = async(data) => {
    let detail = {
        mobile : data.data.borrowerData.mobile,
        firstName : data.data.borrowerData.firstName,
        lastName : data.data.borrowerData.lastName,
        borrowerUuid: data.data.borrowerData.borrowerUuid,
        email: data.data.borrowerData.email
    }

    // const response = await axios.post(`${API_URL}/api/loan/ask/consent/${leadInfo.leadId}/`,detail,{
    //     headers: {
    //         token: `3de1186482cdde561ca24e0e03f0753cd2616eba`,
    //     },
    // })
    // .then(res => res.data)
    // .catch(error => error.response.data);
    closeUserConsentModal()
}

const goToDraftPage=()=>{
    setLoader(false)
    let i = 2
    setScreen(i)
}

const goToDownloads=()=>{
    setLoader(false)
    let i = 3
    setScreen(i)
}

const handleTableIconClick= async (item,index)=>{
    setTurnOnButtonLoader({
      status: true,
      data: item
    })
    await getQuickViewData(item)
    navigatePage(1)
}

const handleTableRowClick=(item,index)=>{
  setPendencyResponse(true)
  openSlidingPanel()
  getPendencyData(item)
}

const getPendencyData=async(item)=>{
  await axios.get(`${API_URL}/api/loan/pendencies/${item?.leadId}/`,{
      headers: {
          token: `${token}`,
      },
  }).
  then(res => {
      handlePendencyData(res.data.data,res.data.consent)
      if(res.data.consent === 'Y'){
          setUserConsent(true)
      }else{
          setUserConsent(false)
      }
      // setPendecyData(res.data.data)
  }).catch(err=>console.log(err));
}

const handlePendencyData=(item,consentData)=>{
  let pendencyArr = Object.entries(item);
  let pendencyOriginals = []
  if(consentData !== 'Y'){
    pendencyOriginals.push('Consent')
  }
  pendencyArr.map((item,index)=>{
      if(item[1] === false)
      pendencyOriginals.push(item[0])
  })
  setPendecyData(pendencyOriginals)
  setPendencyResponse(false)
}

const closeUploadModal=()=>{
    setUploadModal(false)
}

const openUploadModal=()=>{
    // closeSlidingPanel()
    setUploadModal(true)
}

const handleDraftSave=()=>{
  setDraftSaved(true)
}

const unsaveDraft=()=>{
  setDraftSaved(false)
}

useEffect(() => {
  getProfileInfo();
}, []);

  return (
    <div className="home-container">
      
         {
            screen !== 1 &&  
            <Header 
                onSearchChange={onSearch}
                goToHomePage={(i) => navigatePage(i)} 
                goToDraftPage={()=>goToDraftPage()}
                goToDownloads={()=>goToDownloads()}
                screen={screen}
           />
         } 
        {screen === 0 && (
          <div className='full-width column'>
            {
              query.length === 0 && 
              <div className="row" style={{ gap: "1rem", minHeight: '80px' }}>
                {statusList.map((status, index) => (
                  <Status
                    key={`${status.name}-${index}`}
                    lightText={status.lightText}
                    boldText={status.boldText}
                    selected={status.selected}
                    onClick={() => handleStatusChange(status, index)}
                    count={status?.count}
                  />
                ))}
              </div>
            }
          

          <div
            className="row"
            style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
          >
            {
              query?.length === 0 ?  <div className="lead-count">Showing {statusCount} leads</div>
              : <div className="lead-count">Showing {searchCount} leads</div>
            }
            
            <Button
              leadingIcon={addIcon}
              text="Create"
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
              onClick={_openLeadForm}
            />
          </div>

          <div className="table-container">
              {
               query.length === 0 && tableData &&  tableData?.length > 0 &&
                  <Table
                        list={[...tableData[getSelectedStatusIndex()]]}
                        onIconClick={(item, index) => {
                                setLeadInfo(item)
                                handleTableIconClick(item,index)
                            }}
                        onRowClick={(item, index) => {
                            setPendecyData([])
                            setLeadInfo(item)
                            handleTableRowClick(item,index)
                        }}
                        turnOnButtonLoader={turnOnButtonLoader}
                        loader={loader}
                  /> 
              }
              {
               query.length > 0 && searchData && searchData?.length > 0 &&
                <SearchTable
                        list={searchData}
                        onIconClick={(item, index) => {
                                setLeadInfo(item)
                                handleTableIconClick(item,index)
                            }}
                        onRowClick={(item, index) => {
                            setLeadInfo(item)
                            openSlidingPanel()
                        }}
                        turnOnButtonLoader={turnOnButtonLoader}
                  /> 
              }
            </div>

              { noResult &&
                  <div className='no-result-content'>
                    <span>No Results</span>
                  </div>
              }

          </div>
      )}

      {screen === 1 && (
        <div className="full-width">
          <DetailPage 
           goToHomePage={(i) => navigatePage(i)} 
           leadData={leadInfo}
           openUserConsentModal={()=>openUserConsentModal()}
           token={token}
           leadOverview={leadOverview}
           instituteName={profile.college}
           previousFormData={formData}
           formData={temporaryFormData}
           setFormData={setTemporaryFormData}
           consent={consent}
           />
        </div>
      )}

    {screen === 2 && (
        <div className="full-width">
          <DraftPage 
           openLeadForm={(data) => _openLeadForm(data)} 
           leadData={leadInfo}
           token={token}
           draftSaved={draftSaved}
           unsaveDraft={unsaveDraft}
           />
        </div>
      )}

    {screen === 3 && (
        <div className="full-width">
          <DownloadPage 
           openLeadForm={() => _openLeadForm()} 
           leadData={leadInfo}
           token={token}
           />
        </div>
      )}        

      {openPanel && (
        <SlidingPanel 
          closeSlidingPanel={() => closeSlidingPanel()} 
          leadData={leadInfo}
          openDetailPage={(item,index) => {
            handleTableIconClick(item,index)
          }}
          openUserConsentModal={()=>openUserConsentModal()}
          openUploadModal={()=>openUploadModal()}
          token={token}
          pendecyData={pendecyData}
          consent={consent}
          pendencyResponse={pendencyResponse}
        />
      )}
      {openLeadForm && 
        <LeadForm 
          onBackPress={_closeLeadForm} 
          instituteName={profile.college} 
          token={token}
          formData={formData} 
          setFormData={setFormData} 
          handleDraftSave={handleDraftSave}
        />
      }

      {consentModal && (
        <UserConsentModal
          closeUserConsentModal={() => closeUserConsentModal()}
          submitConsent={()=>getQuickViewData()}
          token={token}
        />
      )}

      {
          uploadModal &&
          <UploadModal 
            closeUploadModal={()=>closeUploadModal()}
            token={token}
            docType={''}
            borrowerUuid={leadInfo.borrowerUuid}
            leadId={leadInfo.leadId}
          />
      }

      {
        loader && 
          <div className="credenc-loader-white fullscreen-loader">
            <TailSpin color="#00BFFF" height={100} width={100}/>
          </div>
      }
        
    </div>
  );
}
