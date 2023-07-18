import React,{useEffect, useState} from 'react'
import sortIcon from '../../assets/Icons/sortIcon.svg'
import downloadIcon from '../../assets/Icons/downloadIcon.svg'
import './/downloadsTable.css'
import moment from 'moment'
import Button from '../button/button.jsx'

export default function DownloadTable({
    list,
    generateReport
}){

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='header-text'>
                    Report
                    {/* <img src={sortIcon}/> */}
                </div>
                <div className='header-text'>
                    Download Date
                </div>
                
                <div className='header-text' style={{flex: '2 1 0px'}}>
                    Created By
                    {/* <img src={sortIcon} style={{marginLeft: 5}}/> */}
                </div>
                <div className='header-text' style={{flex: '1 1 0px'}}>
                    Downloads
                </div>
            </div>
            <div className='table-row-container'>
                { list.map((item, index) => (
                    <div key={`${item}-${index}`} className='draft-table-row'>
                        <div className='row-text'>{ item.report_name }</div>
                        <div className='row-text'>{ moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a') }</div>
                        <div className='row-text'>{ '' }</div>
                        <div className='row-text' style={{flex: '1 1 0px'}}>
                        <Button
                            leadingIcon={downloadIcon}
                            text="Generate Report"
                            classes={{
                                background: "#0DB78F",
                                borderRadius: "8px",
                                height: "44px",
                            }}
                            textClass={{
                                color: "#FFF",
                                fontSize: "13px",
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                            }}
                            onClick={()=>generateReport(item)}
                            //   onClick={_openLeadForm}
                        />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
          
  )
}



