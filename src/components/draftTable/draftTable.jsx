import React,{useEffect, useState} from 'react'
import sortIcon from '../../assets/Icons/sortIcon.svg'
import trashIcon from '../../assets/Icons/trash.svg'
import editIcon from '../../assets/Icons/editIcon.svg'
import './/draftTable.css'
import moment from 'moment'

export default function DraftTable({
    list,
    onRowClick,
    onIconClick
}){

    const handleIconClick = (event, item, index) => {
        event.stopPropagation();
        onIconClick(item, index);
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='header-text'>
                    Lead ID
                    <img src={sortIcon}/>
                </div>
                <div className='header-text'>
                    Applicant
                </div>
                <div className='header-text'>
                    Mobile
                </div>
                <div className='header-text'>
                    Amount
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div>
                <div className='header-text'>
                    Course
                </div>
                <div className='header-text' style={{flex: '3 1 0px'}}>
                    Created By
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div>
                <div className='header-text' style={{flex: '1 1 0px'}}></div>
            </div>
            <div className='table-row-container'>
                { list.map((item, index) => (
                    <div key={`${item}-${index}`} className='draft-table-row' onClick={() => onRowClick(item, index)}>
                        <div className='row-text'>{ item.id }</div>
                        <div className='row-text'>{ item.student_name }</div>
                        <div className='row-text'>{ item.applicant_phone }</div>
                        <div className='row-text'>{ item.loan_amount }</div>
                        <div className='row-text'>{ item.course }</div>
                        <div className='row-text' style={{flex: '3 1 0px'}}>
                            <div className='column'>
                                <span>{item.access_username}</span>
                                <span>{moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </div>
                            
                            </div>
                        <div className='row-text draft-icon-container' style={{flex: '1 1 0px'}}>
                            <img src={editIcon} height={24} width={24} style={{ objectFit: 'contain',cursor: 'pointer'}}/>
                            {/* <img src={trashIcon} height={24} width={24} style={{ objectFit: 'contain',marginLeft: 8,cursor: 'pointer'}}/> */}
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
          
  )
}



