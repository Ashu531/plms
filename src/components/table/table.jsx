import React,{useEffect, useState} from 'react'
import './table.css'
import { Bars, TailSpin } from "react-loader-spinner";

export default function Table({
    list,
    onRowClick,
    onIconClick,
    turnOnButtonLoader,
    loader,
    tableType
}){

    const [buttonLoader,setButtonLoader] = useState(false)
    const [noResult,setNoResult] = useState(false)

    const handleIconClick = (event, item, index) => {
        event.stopPropagation();
        onIconClick(item, index);
    }

    useEffect(()=>{
        if(turnOnButtonLoader.status === true){
            setButtonLoader(true)
        }else{
            setButtonLoader(false)
        }
    },[turnOnButtonLoader])

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='header-text'>
                    Lead ID
                    {/* <img src={sortIcon}/> */}
                </div>
                <div className='header-text'>
                    Applicant
                </div>
                <div className='header-text'>
                    Mobile
                </div>
                <div className='header-text'>
                    Amount
                    {/* <img src={sortIcon} style={{marginLeft: 5}}/> */}
                </div>
                {
                    (tableType === 0 || tableType === 5) &&
                    <div className='header-text'>
                        UTR
                    </div>
                }
                {
                    (tableType === 0 || tableType === 5) &&
                    <div className='header-text' style={{flex: '3 1 0px'}}>
                    Disbursed On
                        {/* <img src={sortIcon} style={{marginLeft: 5}}/> */}
                    </div>
                }
                {/* <div className='header-text'>
                    UTR
                </div>
                <div className='header-text' style={{flex: '3 1 0px'}}>
                    Disbursed On
                    <img src={sortIcon} style={{marginLeft: 5}}/>
                </div> */}
                <div className='header-text' style={{flex: '1 1 0px'}}></div>
            </div>
                
                <div className='table-row-container'>
                { list.length > 0 ? list.map((item, index) => (
                    
                        <div key={`${item}-${index}`} className='table-row' onClick={() => onRowClick(item, index)}>
                            <div className='row-text'>{ item.application_id }</div>
                            <div className='row-text'>{ item.student_name }</div>
                            <div className='row-text'>{ item.applicant_phone }</div>
                            <div className='row-text'>{ item.course_fee }</div>
                            {
                                (tableType === 0 || tableType === 5) &&
                                <div className='row-text'>{ item.utr ? item.utr : '-' }</div>
                            }
                            {
                                (tableType === 0 || tableType === 5) &&
                                <div className='row-text' style={{flex: '3 1 0px'}}>{ item.disbursementDatetime ? item.disbursementDatetime : '-' }</div>
                            }
                            {/* <div className='row-text'>{ item.utr ? item.utr : '-' }</div>
                            <div className='row-text' style={{flex: '3 1 0px'}}>{ item.disbursementDatetime ? item.disbursementDatetime : '-' }</div> */}
                            <div className='row-text icon-container' style={{flex: '1 1 0px'}} onClick={(e) => handleIconClick(e, item, index)}>
                                {
                                turnOnButtonLoader?.data?.leadId === item?.leadId && buttonLoader ? 
                                    <div>
                                        <TailSpin color="#0DB78F" height={12} width={12}/>
                                    </div>
                                    :
                                    <div className='caret-icon'></div>
                                }
                            </div>
                        </div>
                    ))
                    :
                    <div className='no-result-conten-table' style={loader ? {marginTop: '10rem',color: '#fff',position:'fixed',top: 99999} : {display: 'block'}}>
                        No Result
                     </div>
                    }
                </div> 
        </div>
          
  )
}



