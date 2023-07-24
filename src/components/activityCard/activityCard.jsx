import React,{useEffect, useState} from 'react'
import './/activityCard.css'
import moment from 'moment'

export default function ActivityCard(props) {

  return (
    <div className='activity-card-container'>
        <div className='column'>
            <div className='row activity-card-title'>
                {props?.title}
            </div>
            <div className='row full-width' style={{marginTop: 10}}>
                <span className='activity-card-footer-subs'>{props?.name}</span>
                <span className='activity-card-footer-subs'>{moment(props?.time).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
        </div>
    </div>
  )
}



