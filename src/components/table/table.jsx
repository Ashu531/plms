import React, { useEffect, useState } from 'react';
import './table.css';
import { TailSpin } from "react-loader-spinner";
import { Pagination } from 'antd';

export default function Table({
    list = [],
    onRowClick,
    onIconClick,
    turnOnButtonLoader,
    loader,
    tableType,
    setPageSize,
    setCurrentHomePage,
    currentHomePage,
    pageSize,
    statusCount,
    fetchData
}) {
    const [buttonLoader, setButtonLoader] = useState(false);

    const handleIconClick = (event, item, index) => {
        event.stopPropagation();
        onIconClick(item, index);
    };

    useEffect(() => {
        setButtonLoader(turnOnButtonLoader?.status);
    }, [turnOnButtonLoader]);

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='header-text'>Lead ID</div>
                <div className='header-text'>Applicant</div>
                <div className='header-text'>Mobile</div>
                <div className='header-text'>Amount</div>
                {(tableType === 0 || tableType === 5) && <div className='header-text'>UTR</div>}
                {(tableType === 0 || tableType === 5) && <div className='header-text' style={{ flex: '3 1 0px' }}>Disbursed On</div>}
                <div className='header-text' style={{ flex: '1 1 0px' }}></div>
            </div>

            <div className='table-row-container'>
                {list.length > 0 ? list.map((item, index) => (
                    <div key={`${item}-${index}`} className='table-row' onClick={() => onRowClick(item, index)}>
                        <div className='row-text'>{item.application_id}</div>
                        <div className='row-text'>{item.student_name}</div>
                        <div className='row-text'>{item.applicant_phone}</div>
                        <div className='row-text'>{item.course_fee}</div>
                        {(tableType === 0 || tableType === 5) && <div className='row-text'>{item.utr ? item.utr : '-'}</div>}
                        {(tableType === 0 || tableType === 5) && <div className='row-text' style={{ flex: '3 1 0px' }}>{item.disbursementDatetime ? item.disbursementDatetime : '-'}</div>}
                        <div className='row-text icon-container' style={{ flex: '1 1 0px' }} onClick={(e) => handleIconClick(e, item, index)}>
                            {turnOnButtonLoader?.data?.leadId === item?.leadId && buttonLoader ?
                                <div><TailSpin color="#0DB78F" height={12} width={12} /></div> :
                                <div className='caret-icon'></div>
                            }
                        </div>
                    </div>
                )) : (
                    <div className='no-result-conten-table' style={loader ? { marginTop: '10rem', color: '#fff', position: 'fixed', top: 99999 } : { display: 'block' }}>
                        No Result
                    </div>
                )}
            </div>

            <Pagination
                className='custom-pagination'
                current={currentHomePage}
                pageSize={pageSize}
                total={statusCount}
                onChange={(page, size) => {
                    setCurrentHomePage(page);
                    setPageSize(size);
                    fetchData(page);
                }}
                style={{marginTop: 12, alignSelf: "end"}}
            />
        </div>
    );
}
