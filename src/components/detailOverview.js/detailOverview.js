import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Divider, message, Button } from 'antd';
import axios from 'axios';
import './detailOverview.css';

const AccountAndAddress = (props) => {
  const [bankDetails, setBankDetails] = useState({
    account_holder_name: '',
    ifsc_code: '',
    account_number: ''
  });

  const [addressDetails, setAddressDetails] = useState({
    current_address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    permanent_address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    }
  });

  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [formBank] = Form.useForm();
  const [formAddress] = Form.useForm();

  useEffect(() => {
    fetchBankDetails();
    fetchAddressDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadID}/bankdetails/`, {
        headers: { 'Token': props?.token }
      });

      const bankData = res?.data?.data?.bank_details;
      if (bankData) {
        setBankDetails({
          account_holder_name: bankData.account_holder_name,
          ifsc_code: bankData.ifsc_code,
          account_number: bankData.account_number
        });
        formBank.setFieldsValue(bankData);
      }
    } catch (error) {
      message.error('Failed to fetch bank details');
    }
  };

  const fetchAddressDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadID}/address/`, {
        headers: { 'Token': props?.token }
      });

      const addressData = res?.data?.data;
      if (addressData) {
        setAddressDetails({
          current_address: addressData.current_address,
          permanent_address: addressData.permanent_address
        });

        setSameAsCurrent(addressData.permanent_same_as_current);
        formAddress.setFieldsValue({
          current_address: addressData.current_address,
          permanent_address: addressData.permanent_address
        });
      }
    } catch (error) {
      message.error('Failed to fetch address details');
    }
  };

  const handleBankSubmit = async (values) => {
    try {
      await axios.put(`${API_URL}/api/loan/v1/loan-lead/${props?.leadID}/bankdetails/`, values, {
        headers: { 'Token': props?.token }
      });
      message.success('Bank details saved successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      message.error(errorMessage);
    }
  };

  const handleAddressSubmit = async (values) => {
    const formattedData = {
      current_address: values.current_address,
      permanent_address: sameAsCurrent ? values.current_address : values.permanent_address,
      permanent_same_as_current: sameAsCurrent
    };

    try {
      await axios.post(`${API_URL}/api/loan/v1/loan-lead/${props?.leadID}/address/`, formattedData, {
        headers: { 'Token': props?.token }
      });
      message.success('Address details saved successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      message.error(errorMessage);
    }
  };

  const handleCheckboxChange = (e) => {
    setSameAsCurrent(e.target.checked);
  };

  return (
    <div className="account-address-container">
      <Row gutter={32}>
        <Col span={12}>
          <Divider>Bank Details</Divider>
          <Form
            layout="vertical"
            form={formBank}
            initialValues={bankDetails}
            onFinish={handleBankSubmit}
            className="bank-form"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Account Holder Name"
                  name="account_holder_name"
                  rules={[{ required: true, message: 'Please enter account holder name' }]}
                >
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="IFSC Code"
                  name="ifsc_code"
                  rules={[
                    { required: true, message: 'Please enter IFSC code' },
                    { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code format' }
                  ]}
                >
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Account Number"
                  name="account_number"
                  rules={[
                    { required: true, message: 'Please enter account number' },
                    { pattern: /^[0-9A-Z]{6,18}$/, message: 'Invalid account number format' }
                  ]}
                >
                  <Input className="input"/>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: '#C2185B', borderRadius: '8px', height: '44px' }}>
                Save Bank Details
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>
          <Divider>Address Details</Divider>
          <Checkbox
            checked={sameAsCurrent}
            onChange={handleCheckboxChange}
            className="checkbox-container"
          >
            Current address is the same as permanent
          </Checkbox>

          <Form
            layout="vertical"
            form={formAddress}
            onFinish={handleAddressSubmit}
            initialValues={addressDetails}
          >
            <Divider>Current Address</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Street" name={['current_address', 'street']}>
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City" name={['current_address', 'city']}>
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="State" name={['current_address', 'state']}>
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Postal Code" name={['current_address', 'postal_code']}>
                  <Input className="input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Country" name={['current_address', 'country']}>
                  <Input className="input"/>
                </Form.Item>
              </Col>
            </Row>

            {!sameAsCurrent && (
              <>
                <Divider>Permanent Address</Divider>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Street" name={['permanent_address', 'street']}>
                      <Input className="input"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="City" name={['permanent_address', 'city']}>
                      <Input className="input"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="State" name={['permanent_address', 'state']}>
                      <Input className="input"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Postal Code" name={['permanent_address', 'postal_code']}>
                      <Input className="input"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Country" name={['permanent_address', 'country']}>
                      <Input className="input"/>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: '#C2185B', borderRadius: '8px', height: '44px' }}>
                Save Address Details
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AccountAndAddress;
