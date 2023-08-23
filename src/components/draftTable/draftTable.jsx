import React,{useEffect, useState} from 'react'
import sortIcon from '../../assets/Icons/sortIcon.svg'
import trashIcon from '../../assets/Icons/trash.svg'
import editIcon from '../../assets/Icons/editIcon.svg'
import './draftTable.css';
import moment from 'moment'

export default function DraftTable({
    list,
    onRowClick,
    onIconClick,
    onDeleteDraft
}){

    const handleIconClick = (event, item, index) => {
        event.stopPropagation();
        onIconClick(item, index);
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='draft-header-text'>
                    ID
                    {/* <img src={sortIcon}/> */}
                </div>
                <div className='draft-header-text'>
                    Applicant
                </div>
                <div className='draft-header-text'>
                    Mobile
                </div>
                <div className='draft-header-text'>
                    Amount
                    {/* <img src={sortIcon} style={{marginLeft: 5}}/> */}
                </div>
                <div className='draft-header-text'>
                    Course
                </div>
                <div className='draft-header-text' style={{flex: '3 1 22px'}}>
                    Created By
                    {/* <img src={sortIcon} style={{marginLeft: 5}}/> */}
                </div>
                {/* <div className='draft-header-text' style={{flex: '1 1 0px'}}></div> */}
            </div>
            <div className='table-row-container'>
                { list.map((item, index) => (
                    <div key={`${item}-${index}`} className='draft-table-row'>
                        <div className='draft-row-text' onClick={() => onRowClick(item, index)}>{ item.id.substring(0,10)+'...' }</div>
                        <div className='draft-row-text' onClick={() => onRowClick(item, index)}>{ item.student_name ? item.student_name : '-' }</div>
                        <div className='draft-row-text' onClick={() => onRowClick(item, index)}>{ item.applicant_phone ? item.applicant_phone : '-'}</div>
                        <div className='draft-row-text' onClick={() => onRowClick(item, index)}>{ item.loan_amount > 0 ? `₹${item.loan_amount}` : '-' }</div>
                        <div className='draft-row-text' onClick={() => onRowClick(item, index)}>{ item.course ? item.course : '-' }</div>
                        <div className='draft-row-text' style={{flex: '1 1 0px'}} onClick={() => onRowClick(item, index)}>
                            <div className='column'>
                                <span>{item.access_username}</span>
                                <span>{moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </div>
                        </div>
                        <div className='draft-row-text draft-icon-container' style={{flex: '1 1 0px'}}>
                            <img src={editIcon} height={24} width={24} style={{ objectFit: 'contain',cursor: 'pointer'}} onClick={() => onRowClick(item, index)}/>
                            <img src={trashIcon} height={24} width={24} style={{ objectFit: 'contain',marginLeft: 8,cursor: 'pointer'}} onClick={()=> onDeleteDraft(item,index)} />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
          
  )
}



