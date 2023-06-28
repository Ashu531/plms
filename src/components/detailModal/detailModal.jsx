import React, { useEffect } from 'react';
import './/detailModal.css'
import uploadIcon from '../../assets/Icons/uploadIcon.svg'
import pendingIcon from '../../assets/Icons/pendingIcon.svg'
import Button from '../button/button.jsx';

export default function DetailModal(props) 
{
    return (
        <div className='detail-modal' >
            <div className='detail-modal-header'>
                <div className='modal-header-content'>
                    <div className='modal-header-name'>
                    Rashmi Ranjan Satapathy
                    </div>
                    <div className='modal-header-lead'>
                    Lead ID: 25883
                    </div>
                </div>
                <div className='upload-icon-content'>
                    <img src={uploadIcon} />
                </div>
            </div>
           
            <div className='modal-content'>
                <div className='modal-divider' />
                <div className='column full-width'>
                    <div className='modal-header'>
                        Details
                    </div>
                    <div className='column full-width' style={{marginTop: 12}}>
                        <div className='row full-width'>
                            <span className='table-label'>Mobile Number</span>
                            <span className='table-value'>+91 9999988888</span>
                        </div>
                        <div className='row full-width'>
                            <span className='table-label'>Email</span>
                            <span className='table-value'>rashmi.satapathy.2588@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className='modal-divider' style={{margin: '24px 0px'}}/>
                <div className='column full-width'>
                    <div className='modal-header'>
                    Pendencies
                    </div>
                    <div className='column full-width' style={{marginTop: 12}}>
                        <div className='row full-width'>
                            <div className='row'>
                                <div className='pending-icon-content'>
                                    <img src={pendingIcon} />
                                </div>
                                <span className='table-label'>Consent</span>
                            </div>
                            <div className='table-link'>Ask for consent</div>
                        </div>
                    </div>
                </div>
                <div className='modal-divider' style={{margin: '24px 0px'}}/>
                <div className='column full-width'>
                    <div className='modal-header'>
                    Last Update
                    </div>
                   <div className='update-content'>
                        <div className='update-content-header'>
                            Lead updated to Consent Not Given
                        </div>
                        <div className='row'>
                            <div className='update-text'>
                            Ujjawal Chauhan
                            </div>
                        </div>
                   </div>
                </div>
            </div>
            <div className='modal-footer row full-width'>
                <Button
                    text='Edit Details'
                    classes={{
                        borderRadius: 8,
                        border: '1px solid #8F14CC',
                        height: '44px',
                        width: '150px',
                    }}
                    textClass={{
                        color: '#8F14CC',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                />
                <Button 
                    text='View Full Details'
                    classes={{
                        background: '#8F14CC',
                        borderRadius: '8px',
                        height: '44px',
                        width: '150px',
                    }}
                    textClass={{
                        color: '#FFF',
                        fontSize: '14px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600
                    }}
                />
            </div>
        </div>
    )
}
