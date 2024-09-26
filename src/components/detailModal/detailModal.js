import React, { useState, useEffect } from 'react';
import './detailModal.css';
import Button from '../button/button.jsx';
import { Modal, Select, Spin } from 'antd';
import ActivityCard from '../activityCard/activityCard.jsx';
import axios from 'axios';

const { Option } = Select;

export default function DetailModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [subStatus, setSubStatus] = useState(null);
    const [statusObject, setStatusObject] = useState(null);
    const [subStatusObject, setSubStatusObject] = useState(null);
    const [statusOptions, setStatusOptions] = useState([]);
    const [subStatusOptions, setSubStatusOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeadData();
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            fetchStatusOptions();
            setStatus(statusObject?.id || null);
            setSubStatus(subStatusObject?.id || null);
        }
    }, [isModalVisible, statusObject, subStatusObject]);

    const fetchStatusOptions = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loan/v1/statuses/`, {
                headers: {
                    token: `${props?.token}`,
                }
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
                    headers: {
                        token: `${props?.token}`,
                    }
                });
                setSubStatusOptions(response.data.data);
            } catch (error) {
                console.error('Error fetching substatuses:', error);
            }
        }
    };

    const fetchLeadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/`, {
                headers: {
                    token: `${props?.token}`,
                }
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        fetchSubStatusOptions(value);
    };

    const handleSubStatusChange = (value) => {
        setSubStatus(value);
    };

    const goToDetailPage = () => {
        props?.openDetailPage(props?.leadData, 1);
    };

    const submitStatusResponse = async () => {
        try {
            await axios.put(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/status/`, {
                status_id: status,
                substatus_id: subStatus
            }, {
                headers: {
                    token: `${props?.token}`,
                }
            });
            await fetchLeadData();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error submitting status response:', error);
        }
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
                                fontWeight: 600
                            }}
                            onClick={showModal}
                        />
                    </div>
                    
                    <div className='update-content' style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <div className='update-content-header'>
                            Status
                        </div>
                        <div className='update-content-header'>
                            {loading ? <Spin /> : <b>{statusObject?.name || "NA"}</b>}
                        </div>
                    </div>
                    <div className='update-content' style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <div className='update-content-header'>
                           Sub Status
                        </div>
                        <div className='update-content-header'>
                            {loading ? <Spin /> : <b>{subStatusObject?.name || "NA"}</b>}
                        </div>
                    </div>
                </div>

                <div className='modal-divider' style={{ margin: '8px 0px' }} />
                <div className='column full-width'>
                    <div className='modal-header'>Last Update</div>
                    <div style={{ marginTop: 16, width: '100%' }}>
                        <ActivityCard 
                            title={props?.lastActivity?.last_activity.action}
                            name={props?.lastActivity?.last_activity.user}
                            time={props?.lastActivity?.last_activity.timestamp}
                        />
                    </div>
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
                        fontWeight: 600
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
                        fontWeight: 600
                    }}
                    onClick={() => goToDetailPage()}
                />
            </div>

            <Modal
                title="Status Overview"
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
                        placeholder="Select Status"
                    >
                        {statusOptions.map(option => (
                            <Option key={option.id} value={option.id}>{option.name}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label>Substatus:</label>
                    <Select
                        value={subStatus}
                        onChange={handleSubStatusChange}
                        style={{ width: '100%', marginTop: 12 }}
                        placeholder="Select Sub Status"
                    >
                        {subStatusOptions.length > 0 && subStatusOptions.map(option => (
                            <Option key={option.id} value={option.id}>{option.name}</Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </div>
    );
}
