import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.jsx";
import addIcon from "../../assets/Icons/addIcon.svg";
import profileIcon from "../../assets/Icons/userIcon.svg";
import checkIcon from "../../assets/Icons/check.svg";
import Status from "../../components/status/status.jsx";
import "./home.css";
import Table from "../../components/table/table.jsx";
import Header from "../../components/header/header.jsx";
import SlidingPanel from "../../components/sliding-panel/sliding_panel.jsx";
import LeadForm from "../../components/leadForm/leadform.jsx";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Input } from "../../components/input/input.jsx";
import { Dropdown } from "../../components/dropdown/dropdown.jsx";
import DetailPage from "../detail/detail.jsx";
import StudentDetailForm, {
  formViewTypes,
  studentFormInputTypes,
} from "../../forms/leadDetails.jsx";
import LoanDetailsForm, {
  loanFormInputTypes,
} from "../../forms/loanDetails.jsx";
import UserConsentModal from "../../components/userConsentModal/userConsentModal.jsx";

let leadList = [
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
  {
    leadId: "255194",
    name: "John Doe",
    mobile: "9999888866",
    amount: "90000",
    update: "consent pending",
    updateTime: "19/05/2022 : 5:53:01 PM",
  },
];

let statuses = [
  {
    boldText: "All",
    selected: true,
  },
  {
    boldText: "Incomplete",
    selected: false,
  },
  {
    boldText: "In Process",
    selected: false,
  },
  {
    boldText: "Closed",
    selected: false,
  },
  {
    boldText: "Approved",
    selected: false,
  },
  {
    boldText: "Disbursed",
    selected: false,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [leadInfo,setLeadInfo] = useState({})
  const [openPanel, setOpenPanel] = useState(false);
  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [screen, setScreen] = useState(0);
  const [consentModal, setConsentModal] = useState(false);
  const [tableData,setTableData] = useState([])
  const [statusList, setStatusList] = useState([...statuses]);

  useEffect(()=>{
    getListData()
  },[])

  let history = useHistory();

  const getListData=async()=>{
    await axios.get(`${API_URL}/api/loan/all/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        console.log(res.data.data)
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  }

  const openSlidingPanel = () => {
    setOpenPanel(true);
  };

  const closeSlidingPanel = () => {
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

  const handleStatusChange = (status, index) => {

    toggleStatus(index)

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

  const toggleStatus=(index)=>{
      console.log(index)
    if(index === 1){
        getIncompleteData()
    }else if(index === 2){
        getInProcessData()
    }else if(index === 3){
        getRejectedData()
    }else if(index === 4){
        getApprovedData()
    }else if(index === 5){
        getDisbursedData()
    }else{
        getListData()
    }
  }

  const getInProcessData=async()=>{
    await axios.get(`${API_URL}/api/loan/inprocess/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  }

  const getRejectedData=async()=>{
    await axios.get(`${API_URL}/api/loan/rejected/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  }

  const getApprovedData=async()=>{
    await axios.get(`${API_URL}/api/loan/approved/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  }

  const getDisbursedData=async()=>{
    await axios.get(`${API_URL}/api/loan/disbursed/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
    }).catch(err=>console.log(err));
  }
  

  const getIncompleteData=async()=>{
    await axios.get(`${API_URL}/api/loan/incomplete/`,{
        headers: {
            token: `fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5`,
        },
    }).
    then(res => {
        setTableData(res.data.data.leads)
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
                count={tableData.length}
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
                        list={[...tableData]}
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
      {openLeadForm && <LeadForm closeLeadModal={_closeLeadForm} instituteName={'Dummy Institute'} />}

      {consentModal && (
        <UserConsentModal
          closeUserConsentModal={() => closeUserConsentModal()}
        />
      )}
    </div>
  );
}
