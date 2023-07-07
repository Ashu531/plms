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
    lightText: "478 Cases",
    boldText: "All",
    selected: true,
  },
  {
    lightText: "478 Cases",
    boldText: "Incomplete",
    selected: false,
  },
  {
    lightText: "478 Cases",
    boldText: "In Process",
    selected: false,
  },
  {
    lightText: "478 Cases",
    boldText: "Closed",
    selected: false,
  },
  {
    lightText: "478 Cases",
    boldText: "Approved",
    selected: false,
  },
  {
    lightText: "478 Cases",
    boldText: "Disbursed",
    selected: false,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");

  const [openPanel, setOpenPanel] = useState(false);
  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [screen, setScreen] = useState(0);
  const [consentModal, setConsentModal] = useState(false);

  const [statusList, setStatusList] = useState([...statuses]);

  let history = useHistory();

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

  const handleSearch = (query) => {
    //search api here
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Search End
  //////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////
  // Status Start

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
              />
            ))}
          </div>

          <div
            className="row"
            style={{ justifyContent: "space-between", margin: "24px 0 0 0" }}
          >
            <div className="lead-count">Showing 478 Incomplete leads</div>
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
            <Table
              list={[...leadList]}
              onIconClick={(item, index) => {navigatePage(1)}}
              onRowClick={(item, index) => {openSlidingPanel()}}
            />
          </div>
        </div>
      )}

      {screen === 1 && (
        <div className="full-width">
          <DetailPage goToHomePage={(i) => navigatePage(i)} />
        </div>
      )}

      {openPanel && (
        <SlidingPanel closeSlidingPanel={() => closeSlidingPanel()} />
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
