import React, { useState, useEffect } from 'react';
import './detailModal.css';
import { Modal, Select, Spin, DatePicker, Input,message } from 'antd';
import Button from '../button/button.jsx';
import ActivityCard from '../activityCard/activityCard.jsx';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

export default function DetailModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [subStatus, setSubStatus] = useState(null);
    const [statusObject, setStatusObject] = useState(null);
    const [subStatusObject, setSubStatusObject] = useState(null);
    const [statusOptions, setStatusOptions] = useState([]);
    const [subStatusOptions, setSubStatusOptions] = useState([]);
    const [disbursalDate, setDisbursalDate] = useState(null);
    const [utr, setUtr] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeadData();
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            fetchStatusOptions();
            setStatus(statusObject?.id || null);
            setSubStatus(subStatusObject?.id || null);
            if (statusObject?.id === '84cbfde5-ba59-4786-a0e9-bbd4b0ef4729') {
                fetchDisbursalData(); 
            }
        }
    }, [isModalVisible, statusObject, subStatusObject]);

    const fetchStatusOptions = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loan/v1/statuses/`, {
                headers: { token: `${props?.token}` },
            });
            setStatusOptions(response.data.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

    const fetchSubStatusOptions = async (statusId) => {
        if (statusId) {
            try {
                const response = await axios.get(`${API_URL}/api/loan/v1/statuses/${statusId}/substatuses/`, {
                    headers: { token: `${props?.token}` },
                });
                setSubStatusOptions(response.data.data);
            } catch (error) {
                console.error('Error fetching substatuses:', error);
            }
        }
    };

    const fetchDisbursalData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/disbursal/`, {
                headers: { token: `${props?.token}` },
            });
            setDisbursalDate(dayjs(response.data.data.disbursal_date));
            setUtr(response.data.data.utr);
        } catch (error) {
            console.error('Error fetching disbursal data:', error);
        }
    };

    const fetchLeadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/`, {
                headers: { token: `${props?.token}` },
            });
            setStatusObject(response.data.data.main_status);
            setStatus(response.data.data.main_status?.id);
            fetchSubStatusOptions(response.data.data.main_status.id);
            setSubStatusObject(response.data.data.substatus);
            setSubStatus(response.data.data.substatus?.id);
        } catch (error) {
            console.error('Error fetching lead data:', error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleStatusChange = (value) => {
        setStatus(value);
        setSubStatus(null);
        setSubStatusObject(null);
        setSubStatusOptions([]);
        fetchSubStatusOptions(value);
    };

    const handleSubStatusChange = (value) => setSubStatus(value);

    const submitStatusResponse = async () => {
        try {
            await axios.put(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/status/`, {
                status_id: status,
                substatus_id: subStatus,
            }, {
                headers: { token: `${props?.token}` },
            });
    
            if (status === '84cbfde5-ba59-4786-a0e9-bbd4b0ef4729') {
                submitDisbursalDetails();
            }
            await fetchLeadData();
            setIsModalVisible(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            message.error(errorMessage);
        }
    };
    

    const submitDisbursalDetails = async () => {
        try {
            await axios.post(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/disbursal/`, {
                disbursal_date: disbursalDate,
                utr: utr,
            }, {
                headers: { token: `${props?.token}` },
            });
            console.log('Disbursal data submitted successfully!');
        } catch (error) {
            console.error('Error submitting disbursal details:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            message.error(errorMessage);
        }
    };

    const goToDetailPage = () => {
        props?.openDetailPage(props?.leadData, 1);
    };

    return (
        <div className='detail-modal'>
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name row'>
                        <span className='modal-header-name'>{props?.leadData?.student_name}</span>
                    </div>
                    <div className='modal-header-lead'>
                        {props?.leadData?.application_id}
                    </div>
                </div>
            </div>

            <div className='modal-content'>
                <div className='modal-divider' />
                <div className='column full-width'>
                    <div className='row full-width'>
                        <div className='modal-header'>Status Overview</div>
                        <Button
                            text='Update'
                            classes={{
                                background: '#C2185B',
                                borderRadius: '8px',
                                height: '32px',
                                width: '25%',
                            }}
                            textClass={{
                                color: '#FFF',
                                fontSize: '14px',
                                fontFamily: 'Montserrat',
                                fontWeight: 600,
                            }}
                            onClick={showModal}
                        />
                    </div>
                    
                    <div className='update-content' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className='update-content-header'>
                            Status
                        </div>
                        <div className='update-content-header'>
                            {loading ? <Spin /> : <b>{statusObject?.name || 'NA'}</b>}
                        </div>
                    </div>
                    <div className='update-content' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className='update-content-header'>
                           Sub Status
                        </div>
                        <div className='update-content-header'>
                            {loading ? <Spin /> : <b>{subStatusObject?.name || 'NA'}</b>}
                        </div>
                    </div>

                    {status === 'disbursed' && (
                        <div className='disbursal-section'>
                            <div className='update-content' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className='update-content-header'>Disbursal Date</div>
                                <DatePicker
                                    value={dayjs(disbursalDate)}
                                    onChange={(date) => setDisbursalDate(date ? date.format('YYYY-MM-DD') : null)}
                                    style={{ width: '60%' }}
                                />
                            </div>
                            <div className='update-content' style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                                <div className='update-content-header'>UTR</div>
                                <Input
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    placeholder='Enter UTR'
                                    style={{ width: '60%' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='modal-footer row full-width'>
                <Button
                    text='Edit Details'
                    classes={{
                        borderRadius: 8,
                        border: '1px solid #C2185B',
                        height: '44px',
                        width: '40%',
                    }}
                    textClass={{
                        color: '#C2185B',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
                    }}
                    onClick={() => {
                        props?.enableEditMode();
                        props?.openLeadForm(props?.leadData);
                    }}
                />
                <Button
                    text='View Full Details'
                    classes={{
                        background: '#C2185B',
                        borderRadius: '8px',
                        height: '44px',
                        width: '40%',
                    }}
                    textClass={{
                        color: '#FFF',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
                    }}
                    onClick={()=>goToDetailPage()}
                />
            </div>

            <Modal
                title='Status Overview'
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={submitStatusResponse}
            >
                <div style={{ marginBottom: 16 }}>
                    <label>Status:</label>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        style={{ width: '100%', marginTop: 12 }}
                        placeholder='Select Status'
                    >
                        {statusOptions.map((option) => (
                            <Option key={option.id} value={option.id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label>Substatus:</label>
                    <Select
                        value={subStatus}
                        onChange={handleSubStatusChange}
                        style={{ width: '100%', marginTop: 12 }}
                        placeholder='Select Sub Status'
                    >
                        {subStatusOptions.length > 0 &&
                            subStatusOptions.map((option) => (
                                <Option key={option.id} value={option.id}>
                                    {option.name}
                                </Option>
                            ))}
                    </Select>
                </div>
                
                {status === '84cbfde5-ba59-4786-a0e9-bbd4b0ef4729' && (
                    <div>
                        <div style={{ marginBottom: 16, marginTop: 24 }}>
                            <label>Disbursal Date:</label>
                            <DatePicker
                                value={disbursalDate ? dayjs(disbursalDate) : null}
                                onChange={(date) => setDisbursalDate(date ? date.format('YYYY-MM-DD') : null)}
                                style={{ width: '100%', marginTop: 12 }}
                            />
                        </div>
                        <div>
                            <label>UTR:</label>
                            <Input
                                value={utr}
                                onChange={(e) => setUtr(e.target.value)}
                                placeholder='Enter UTR'
                                style={{ width: '100%', marginTop: 12 }}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
