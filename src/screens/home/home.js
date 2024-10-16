import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../components/table/table.jsx';
import { Bars } from 'react-loader-spinner';
import { apiRequest } from '../../helpers/apiRequest.js';
import Status from '../../components/status/status.jsx';
import axios from 'axios';
import Header from '../../components/header/header.jsx';
import { useNavigate } from "react-router-dom";
import DownloadPage from '../downloads/downloads'
import DetailPage from '../detail/detail'
import SlidingPanel from "../../components/sliding-panel/sliding_panel.jsx";
import Button from '../../components/button/button.jsx';
import addIcon from "../../assets/Icons/addIcon.svg";
import LeadForm from '../../components/leadForm/leadform.jsx';
import './home.css'

const Home = () => {

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
    const token = localStorage.getItem("token")
    const college = localStorage.getItem("college")

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusList, setStatusList] = useState([]);
    
    const [screen,setScreen] = useState(0)
    const [formData, setFormData] = useState({...initialFormState});
    const [temporaryFormData, setTemporaryFormData] = useState();
    const [leadInfo,setLeadInfo] = useState({})
    const [refreshed,setRefreshed] = useState(false)
    const [openPanel,setOpenPanel] = useState(false);
    const [turnOnButtonLoader,setTurnOnButtonLoader] = useState({
      status : false,
      data : {}
    })
    const [uploadModal,setUploadModal] = useState(false)
    const [openLeadForm, setOpenLeadForm] = useState(false);
    const [query, setQuery] = useState("");
    const [statusCount,setStatusCount] = useState(0)
    const [searchData,setSearchData] = useState([])
    const [searchCount,setSearchCount] = useState(0);
    const [noResult,setNoResult] = useState(false)
    const [editMode,setEditMode] = useState(false)
    const [lastActivity,setLastActivity] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
       fetchStatuses();
       fetchData();
    }, []);

    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);
  
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [escFunction]);
  
    const escFunction = useCallback((event) => {
      if (event.key === "Escape") {
        setOpenLeadForm(false)
      }
    }, []);

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
          if(query?.length > 0){
              handleSearch(query);
          }
       }, 500);
  
      return () => clearTimeout(delayDebounce);
    }, [query]);

    const onSearch = async (query) => {
      if(query.length > 0){
        setLoading(true)
      }else{
        setLoading(false)
        setNoResult(false)
      }
      
      setQuery(query);
      setSearchCount(0)
      setSearchData([])
    };

    const handleSearch = async(query) => {

      await axios.get(`${API_URL}/api/loan/v1/list-loan-leads/?search=${query}&page_size=${pageSize}&page_num=${currentPage}`,{
          headers: {
              token: `${token}`,
          },
      }).
      then(res => {
          if(res?.data?.data.length > 0){
              let detail = res?.data.data;
              setLoading(false)
              setSearchData(detail)
              setSearchCount(res?.data?.count)
              setNoResult(false)
          }else{
              setLoading(false)
              setNoResult(true)
              setSearchCount(0)
              setSearchData([])
          }
          
      }).catch(err=>console.log(err));
    };

    const fetchStatuses = async () => {
      try {
        const statuses = ['incomplete', 'inprocess', 'rejected', 'approved', 'disbursed'];
    
        const allResponse = await axios.get(`${API_URL}/api/loan/v1/list-loan-leads/?page_size=${pageSize}&page_num=${currentPage}`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
    
        const allCount = allResponse.data.count; 
    
        const results = await Promise.all(
          statuses.map(async (status) => {
            try {
              const response = await axios.get(`${API_URL}/api/loan/v1/list-loan-leads/?page_size=${pageSize}&page_num=${currentPage}&status=${status}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'token': token,
                },
              });
              return { name: status, count: response.data.count };
            } catch (error) {
              throw new Error(`Failed to fetch data for status ${status}`);
            }
          })
        );
    
        const statusData = [{ name: 'all', count: allCount }, ...results]; 
        setStatusList(statusData);
      } catch (err) {
        setError('Failed to fetch statuses');
      } finally {
        setLoading(false);
      }
    };
    
    
    
    const handleStatusChange = async (status, index) => {
      try {
        setLoading(true);
        let url = `${API_URL}/api/loan/v1/list-loan-leads/?page_size=${pageSize}&page_num=${currentPage}`;
        if (status.name !== 'all') {
          url += `&status=${status.name}`;
        }
    
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
    
        setData(response.data.data);
        setStatusCount(response.data.count);
        setScreen(0);  
      } catch (error) {
        setError('Failed to fetch data for the selected status');
      } finally {
        setLoading(false);
      }
    };
    
  

    const fetchData = async () => {
      try {
        await apiRequest({
            url: `/api/loan/v1/list-loan-leads/?page_size=${pageSize}&page_num=${currentPage}`,
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            onSuccess: async (data) => {
                if(data.data.length > 0){
                  setData(data.data);
                  setStatusCount(data.count);
                } else {
                  setData([]);
                }
            },
            onError: (response) => {
                setError({...error, otp: response.data.message});
                setLoading(false);
            }
        })
      } catch (err) {
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
    };
    

  const handleRowClick = (item, index) => {
        // getQuickViewData(item)
        getLastActivity(item)
        setLeadInfo(item)   
    };

  const goToDownloads=()=>{
    let i = 3
    setScreen(i)
  }

  const navigatePage = (i) => {
    
    // setQuery('')
    setLoading(false)
    if(i == 0){
      fetchData();
      resetDetailsPage();
    }
      
       setOpenPanel(false);
       setScreen(i);
  };

  const resetDetailsPage = () => {
    // setLeadOverview(null);
    setFormData({...initialFormState});
    setTemporaryFormData({...initialFormState});
  }

  const handleIconClick= async (item,index)=>{
    setLeadInfo(item)
    // setPendencyResponse(true)
    // getPendencyData(item)
    setTurnOnButtonLoader({
        status: true,
        data: item
    })
    await getQuickViewData(item)
    navigatePage(1)
    setOpenLeadForm(false)
    setLoading(false)
  }

  const getLastActivity=async(leadData)=>{
    await axios.get(`${API_URL}/api/loan/v1/loan-lead-last-activity/${leadData?.id}/`,{
      headers: {
          token: `${token}`,
      },
  }).
  then(res => {
     setLastActivity(res.data.data)
     openSlidingPanel()
  }).catch(err=>console.log(err));
  }

    const getQuickViewData=async(leadData,type)=>{
      await axios.get(`${API_URL}/api/loan/v1/loan-lead/${leadData?.id}/`,{
          headers: {
              token: `${token}`,
          },
      }).
      then(res => {
        
          const resData = res?.data?.data
          // setLeadOverview(resData)
          let data = {
            leadId: `${resData?.application_id}`,
            studentName: `${resData?.student_name}`,
            institute: college,
            mobile: `${resData?.applicant_phone}`,
            email: `${resData?.applicant_email}`,
            borrowerName: `${resData?.borrower_name}`,
            course: `${resData?.course}`,
            courseFee: `${resData?.course_fee}`,
            loanAmount: `${resData?.loan_amount}`,
            tenure: `${resData?.tenure}`,
            advanceEmi: `${resData?.advance_emi}`
        }

        setFormData({...data});
        setTemporaryFormData({...data});
        setTurnOnButtonLoader({
          status: false,
          data : {}
        })
      }).catch(err=>console.log(err));
    }

    const handleRefresh=()=>{
      setRefreshed(!refreshed)
    }

    const onRefresh=(item)=>{
      setLeadInfo(item)
      handleIconClick(item)
      handleRefresh()
    }

    const closeSlidingPanel = () => {
      // setLeadInfo({});
      resetDetailsPage()
      setOpenPanel(false);
    }

    const openSlidingPanel = () => {
      setOpenPanel(true);
    };

    const openUploadModal=()=>{
      // closeSlidingPanel()
      setUploadModal(true)
  }

  const _openLeadForm = (data) => {
    let resData = data;
    if(resData){
      const formData = {
            leadId: `${resData?.application_id}`,
            studentName: `${resData?.student_name}`,
            // institute: profile.college,
            mobile: `${resData?.applicant_phone}`,
            email: `${resData?.applicant_email}`,
            borrowerName: `${resData?.borrower_name}`,
            course: `${resData?.course}`,
            courseFee: `${resData?.course_fee}`,
            loanAmount: `${resData?.loan_amount}`,
            tenure: `${resData?.tenure}`,
            advanceEmi: `${resData?.advance_emi}`,
            id: `${resData.id}`
      }
      setFormData({...formData});
      setTemporaryFormData({...formData});
    }
    setLoading(false)
    setOpenLeadForm(true);
  };

  const handleCloseLeadForm=()=>{
    setOpenLeadForm(false)
    resetDetailsPage()
  }

  const _closeLeadForm = async(res) => {
    let leadData = res.data;

    if(!leadData) return;

    leadData['leadId'] = leadData.id
    setLeadInfo(leadData)
    setLoading(true)
    // getQuickViewData(leadData)
    // resetDetailsPage()
    handleIconClick(leadData,'detail')
    setEditMode(false)
  };

  const removeSearchQuery=()=>{
    setQuery('')
  }

  const enableEditMode=()=>{
    setEditMode(true)
  }

  const handleLogout = async() => {
    setLoading(true)
    await apiRequest({
      url: `/api/auth/v1/logout/`,
      method: 'POST',
      data: {},
      headers: { 
        'token' : token,
     },
      onSuccess: async (data) => {
        setLoading(false)
        localStorage.removeItem("token");
        localStorage.removeItem("college");
        navigate('/login', { replace: true });
      },
      onError: (response) => {
          setLoading(false);
      }
  });
   
  };

    return (
          <div className="home-container">
            {
              screen !== 1 &&  
                  <Header
                    onSearchChange={onSearch}
                    goToHomePage={(i) => navigatePage(i)} 
                    goToDownloads={()=>goToDownloads()}
                    removeSearchQuery={()=>removeSearchQuery()}
                    query={query}
                    token={token}
                    screen={screen}
                    logout={handleLogout}
              />
            }
            { screen === 0 &&
            <div className="row" style={{ gap: "1rem", minHeight: '80px' }}>
                {statusList.map((status, index) => (
                  <Status
                    key={`${status.name}-${index}`}
                    lightText={status.lightText}
                    boldText={status.name}
                    selected={status.selected}
                    onClick={() => handleStatusChange(status, index)}
                    count={status?.count}
                  />
                ))}
              </div>
            }
            { screen === 0 &&  <div
                className="row"
                style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
              >
                {
                  query?.length === 0 ?  <div className="lead-count">Showing {statusCount} leads</div>
                  : <div className="lead-count">Showing {searchCount} leads</div>
                }
              <div className='create-button-container'>          
                <Button
                  leadingIcon={addIcon}
                  text="Create Lead"
                  classes={{
                    background: "#C2185B",
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

            </div>
            }

            {loading ? (
              <div className="loader">
                <Bars color="#00BFFF" height={80} width={80} />
              </div>
            ) : noResult ? (
              <div className="no-results">No results found for "{query}"</div>
            ) : query?.length > 0 && screen === 0 ? (
              <Table
                list={searchData} 
                onRowClick={handleRowClick}
                onIconClick={handleIconClick}
                turnOnButtonLoader={{ status: false }}
                loader={loading}
                tableType={0}
                setPageSize={setPageSize}
                setCurrentHomePage={setCurrentPage}
                currentHomePage={currentPage}
                pageSize={pageSize}
                statusCount={searchCount}
                fetchData={fetchData} 
              />
            ) : (
              screen === 0 && <Table
                list={data}
                onRowClick={handleRowClick}
                onIconClick={handleIconClick}
                turnOnButtonLoader={{ status: false }}
                loader={loading}
                tableType={0}
                setPageSize={setPageSize}
                setCurrentHomePage={setCurrentPage}
                currentHomePage={currentPage}
                pageSize={pageSize}
                statusCount={statusCount}
                fetchData={fetchData}
              />
            )}


             {screen === 1 && (
                <div className="full-width">
                    <DetailPage
                      goToHomePage={(i) => navigatePage(i)} 
                      leadData={leadInfo}
                      token={token}
                      // leadOverview={leadOverview}
                      instituteName={college}
                      previousFormData={formData}
                      formData={temporaryFormData}
                      setFormData={setTemporaryFormData}
                      onRefresh={(item)=>onRefresh(item)}
                      handleRefresh={()=>handleRefresh()}
                      refreshed={refreshed}
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
                  handleIconClick(item,index)
                }}
                openUploadModal={()=>openUploadModal()}
                token={token}
                openLeadForm={(item) => _openLeadForm(item)} 
                enableEditMode={()=>enableEditMode()}
                lastActivity={lastActivity}
              />
            )}
            {openLeadForm && 
              <LeadForm 
                onBackPress={(res)=>_closeLeadForm(res)} 
                token={token}
                formData={formData} 
                setFormData={setFormData} 
                handleCloseLeadForm={()=>handleCloseLeadForm()}
                instituteName={college}
                edit={editMode}
                // setLeadData={setLeadInfo}
              />
            }
          </div>
    );
};

export default Home;
