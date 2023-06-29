import React,{useState} from 'react';
import caretIcon from '../../assets/Icons/caretIcon.svg'
import consentIcon from '../../assets/Icons/consentIcon.svg'
import DocumentCard from '../../components/documentCard/documentCard.jsx';
import TabBar from '../../components/tabBar/tabBar.jsx';
import Upload from '../../components/upload/upload.jsx';
import addIcon from '../../assets/Icons/addIcon.svg'
import './/detail.css'

export default function DetailPage(props) {

    const [tab,setTab] = useState(0);

  const handleBack=()=>{
    let i = 0
    props?.goToHomePage(i)
  }

  const handleTabNavigation = (i) => {
    setTab(i);
 }

  return (
    <div className='lead-detail-page'>
        <div className='lead-page-header full-width'>
            <div className='row full-width'>
                <div className='row'>
                    <img src={caretIcon} onClick={()=>handleBack()} style={{cursor:'pointer'}}/>
                    <div className='column' style={{marginTop: 20,marginLeft: 12}}>
                        <span className='lead-page-heading'>Rashmi Ranjan Satapathy</span>
                        <span className='lead-page-subheading'>+91 90401 46344</span>
                    </div>
                </div>
                <div className='column'>
                    <div className='row'>
                        <span className='lead-page-intruction-label'>Lead Consent: </span>
                        <img src={consentIcon} />
                    </div>
                    <span className='consent-link'>
                        Ask for Consent
                    </span>
                </div>
            </div>
        </div>
        <div className='lead-page-content'>
            <TabBar 
                items={["Details", "Financials", "Documents", "Activity Log & Comments"]}
                handleTabNumber={handleTabNavigation}
                selected={tab}
            />
            {
                tab === 2 && 
                <div className='document-container row full-width'>
                    <div className='column' style={{width: '40%',gap:20}}>
                        <DocumentCard
                          title={'PAN Card'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <DocumentCard
                          title={'Address Proof'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <DocumentCard
                          title={'Bank Statement'}
                          desc={'Upload a clear image of your PAN Card clearly stating your name and date of birth.'}
                          instruction={'Format: PDF, PNG, JPEG, JPG.'}
                        />
                        <div className='add-info-container row full-width'>
                            <div className='row'>
                                <img src={addIcon} height={20} width={20} style={{objectFit:'contain'}} />
                                <span className='add-doc-text'>Additional Documents</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"></path></svg>
                        </div>
                    </div>
                    <div className='row'>
                        <Upload />
                    </div>
                </div>    
            }
        </div>
    </div>
  )
}
