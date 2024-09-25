import React,{useState,useEffect} from "react";
import Button from "../button/button.jsx";
import { Dropdown } from "../dropdown/dropdown.jsx";
import '../lenderForm/lenderForm.css'
import { Select } from "../select/select.jsx";
import axios from 'axios';

export default function LenderForm(props){

    const [selectedLender, setSelectedLender] = useState("");

    useEffect(()=>{
        getLeadLender();
    },[])

    const getLeadLender=async()=>{
        await axios.get(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/lender/`,{
            headers: {
                token: `${props?.token}`,
            },
        }).
        then(res => {
            if(res.data.data.lender.length > 0){
                setSelectedLender(res.data.data.lender)
            }
        }).catch(err=>{
            console.log(err,"error")
        });
    }

    const submitDetails = async() => {
        let data = {
            "lender" : selectedLender
        }

        await axios.put(`${API_URL}/api/loan/v1/loan-lead/${props?.leadData?.id}/lender/`,data,{
            headers: {
                token: `${props?.token}`,
            },
        }).
        then(res => {
            alert('Data Submitted Successfully!')
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
    }

    return(
        <div className="lender-form-container">
            <div className='lender-form-header'>
                Lender Details
            </div>
            <div className='column'>
                <div className='row'>
                    <div style={{width: '45%',cursor:'pointer'}}>
                        <Select 
                        items={props?.lenderData}
                        value={selectedLender}
                        onChange={setSelectedLender}
                        placeholder="Select Lender"
                        />
                    </div>
                    
                </div>
                <div style={{width: '45%', marginTop: 24}}>
                         <Button
                            text='Submit'
                            classes={{
                                background: '#C2185B',
                                borderRadius: '8px',
                                height: '44px'
                            }}
                            textClass={{
                                color: '#FFF',
                                fontSize: '14px',
                                fontFamily: 'Montserrat',
                                fontWeight: 600
                            }}
                            onClick={()=>submitDetails()}
                        />
                </div>
            </div>
        </div>
    )
}