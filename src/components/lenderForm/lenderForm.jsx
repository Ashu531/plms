import React, { useState, useEffect } from "react";
import Button from "../button/button.jsx";
import { Select } from "../select/select.jsx";
import axios from 'axios';
import { message } from 'antd';
import '../lenderForm/lenderForm.css';

export default function LenderForm(props) {
  const [selectedLender, setSelectedLender] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState("");

  useEffect(() => {
    getLeadLender();
  }, []);

  const getLeadLender = async () => {
    await axios
      .get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/lender/`, {
        headers: {
          token: `${props?.token}`,
        },
      })
      .then((res) => {
        if (res.data.data.lender.length > 0) {
          setSelectedLender(res.data.data.lender);
        }
        if (res.data.data.loan_type.length > 0) {
          setSelectedLoanType(res.data.data.loan_type);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const submitDetails = async () => {
    let data = {
      lender: selectedLender,
      loan_type: selectedLoanType,
    };

    await axios
      .put(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/lender/`, data, {
        headers: {
          token: `${props?.token}`,
        },
      })
      .then((res) => {
        message.success("Data Submitted Successfully!");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            message.error(errorMessage);
      });
  };

  return (
    <div className="lender-form-container">
      <div className="lender-form-header">Lender Details</div>
      
      <div className="form-row">
        <div className="form-item">
          <label className="form-label">Lender</label>
          <Select
            items={props?.lenderData}
            value={selectedLender}
            onChange={setSelectedLender}
            placeholder="Select Lender"
          />
        </div>

        <div className="form-item">
          <label className="form-label">Loan Type</label>
          <Select
            items={props?.loanTypeList}
            value={selectedLoanType}
            onChange={setSelectedLoanType}
            placeholder="Select Loan Type"
          />
        </div>
      </div>

      <div className="form-submit">
        <Button
          text="Submit"
          classes={{
            background: "#C2185B",
            borderRadius: "8px",
            height: "44px",
            width: '25%',
          }}
          textClass={{
            color: "#FFF",
            fontSize: "14px",
            fontFamily: "Montserrat",
            fontWeight: 600,
          }}
          onClick={submitDetails}
        />
      </div>
    </div>
  );
}
