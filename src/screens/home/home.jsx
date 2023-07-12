import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import Status from "../../components/status/status.jsx";
import "./home.css";
import Table from "../../components/table/table.jsx";
import Header from "../../components/header/header.jsx";
import SlidingPanel from "../../components/sliding-panel/sliding_panel.jsx";
import LeadForm from "../../components/leadForm/leadform.jsx";
import axios from 'axios';
import DetailPage from "../detail/detail.jsx";
import UserConsentModal from "../../components/userConsentModal/userConsentModal.jsx";

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



export default function Home() {
  const [query, setQuery] = useState("");
  const [leadInfo,setLeadInfo] = useState({})
  const [openPanel, setOpenPanel] = useState(false);
  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [screen, setScreen] = useState(0);
  const [consentModal, setConsentModal] = useState(false);
  const [tableData,setTableData] = useState(Array(6).fill([]))
  const [statusList, setStatusList] = useState([...statuses]);


  const updateTableData = (data, index) => {

    let newData = [...tableData];
    newData[index] = data;

    setTableData(newData);

  }

  const openSlidingPanel = () => {
    setOpenPanel(true);
  };

  const closeSlidingPanel = () => {
    setLeadInfo({});
    setOpenPanel(false);
  };

  const _openLeadForm = () => {
    setOpenLeadForm(true);
  };

  const _closeLeadForm = () => {
    setOpenLeadForm(false);
  };

  ///////////////////////////////////////////////////////////////
  // Search Start

  const onSearch = async (query) => {
    setQuery(query);
  };

  const handleSearch = async(query) => {
    //search api here
    await axios.get(`${API_URL}/api/loan/search/filter/?search=${query}`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if(query.length > 0){
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
  };

  const updateStatusList = (count, index) => {
    let newStatusList = [...statusList];
    newStatusList[index] = {...newStatusList[index], count: count}
    setStatusList(newStatusList);
  }

  const getTableData=async(index)=>{

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
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        return res.data.data;
    }).catch(err=>console.log(err));
  }

  // Status End
  //////////////////////////////////////////////////////////////////

  const navigatePage = (i) => {
    setScreen(i);
  };

  const closeUserConsentModal = () => {
    setConsentModal(false);
  };

  useEffect(() => {
    if(screen == 0){
      setLeadInfo({});
    }
  }, [screen])

  const getLeadsAndCount = async (data) => {
    return await data;
  }

  const updateScreen = async () => {
    let allData = getTableData(statusIndices.ALL);
    let incompleteData = getTableData(statusIndices.INCOMPLETE);
    let inProcessData = getTableData(statusIndices.IN_PROCESS);
    let closedData = getTableData(statusIndices.CLOSED);
    let approvedData = getTableData(statusIndices.APPROVED);
    let disbursedData = getTableData(statusIndices.DISBURSED);

    let newTableData = [...tableData];
    let newStatusList = [...statusList];

    allData = await allData;
    newTableData[statusIndices.ALL] = allData.leads;
    newStatusList[statusIndices.ALL] = {...newStatusList[statusIndices.ALL], count: allData.count}

    incompleteData = await incompleteData;
    newTableData[statusIndices.INCOMPLETE] = incompleteData.leads;
    newStatusList[statusIndices.INCOMPLETE] = {...newStatusList[statusIndices.INCOMPLETE], count: incompleteData.count}

    inProcessData = await inProcessData;
    newTableData[statusIndices.IN_PROCESS] = inProcessData.leads;
    newStatusList[statusIndices.IN_PROCESS] = {...newStatusList[statusIndices.IN_PROCESS], count: inProcessData.count}

    closedData = await closedData;
    newTableData[statusIndices.CLOSED] = closedData.leads;
    newStatusList[statusIndices.CLOSED] = {...newStatusList[statusIndices.CLOSED], count: closedData.count}

    approvedData = await approvedData;
    newTableData[statusIndices.APPROVED] = approvedData.leads;
    newStatusList[statusIndices.APPROVED] = {...newStatusList[statusIndices.APPROVED], count: approvedData.count}

    disbursedData = await disbursedData;
    newTableData[statusIndices.DISBURSED] = disbursedData.leads;
    newStatusList[statusIndices.DISBURSED] = {...newStatusList[statusIndices.DISBURSED], count: disbursedData.count}

    setTableData(newTableData);
    setStatusList(newStatusList);
    
  }

  useEffect(() => {
    updateScreen()
  }, [])

  return (
    <div className="home-container">
      {screen === 0 && (
        <div className="column full-width">
          <Header onSearchChange={onSearch} />

          <div className="row" style={{ gap: "1rem", minHeight: '80px' }}>
            {statusList.map((status, index) => (
              <Status
                key={`${status.name}-${index}`}
                lightText={status.lightText}
                boldText={status.boldText}
                selected={status.selected}
                onClick={() => handleStatusChange(status, index)}
                count={status.count}
              />
            ))}
          </div>

          <div
            className="row"
            style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
          >
            <div className="lead-count">Showing {tableData.length} Incomplete leads</div>
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
                  tableData.length > 0 ? 
                  <Table
                        list={[...tableData[getSelectedStatusIndex()]]}
                        onIconClick={(item, index) => {
                            setLeadInfo(item)
                            navigatePage(1)}}
                        onRowClick={(item, index) => {
                            setLeadInfo(item)
                            openSlidingPanel()
                        }}
                  /> : 
                  <div className='no-result-content'>
                    <span>No Results</span>
                  </div>
              }
            
          </div>
        </div>
      )}

      {screen === 1 && (
        <div className="full-width">
          <DetailPage 
           goToHomePage={(i) => navigatePage(i)} 
           leadData={leadInfo}
           />
        </div>
      )}

      {openPanel && (
        <SlidingPanel 
          closeSlidingPanel={() => closeSlidingPanel()} 
          leadData={leadInfo}
        />
      )}
      {openLeadForm && <LeadForm onBackPress={_closeLeadForm} instituteName={'Dummy Institute'} />}

      {consentModal && (
        <UserConsentModal
          closeUserConsentModal={() => closeUserConsentModal()}
        />
      )}
    </div>
  );
}
