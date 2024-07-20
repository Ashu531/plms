import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../components/loginButton/loginButton';
import InputField from '../../components/inputField/InputField';
import { delay, getToken, saveStudents, saveToken } from '../../helpers/authService.js';
import { Bars, TailSpin } from 'react-loader-spinner';
import { apiRequest } from '../../helpers/apiRequest.js';
import OtpField from '../../components/otpField/otpField.js';
import './login.css'

export default function Login() {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [otp, setOtp] = useState({
        generated: false,
        values: ['', '', '', '', '', '']
    });
    const [verified, setVerified] = useState(false);
    
    const [loader, setLoader] = useState(false);

    const [error, setError] = useState({
        number: null,
        otp: null,
    });

    const handleInputChange = (value) => {
        let isnum = /^\d+$/.test(value);
        if(value.length < 6){
            setInputValue(value);
            setIsValid(false);
            setError({...error,number: ''})
        }
        
        if(value.length >= 6){
            setInputValue(value);
            if(!isnum)
                setIsValid(false);
            else
                setIsValid(true);
        }
            
    }

    const resendOtp = async () => {
        let resendState = ['','','','','','']
        setOtp({...otp,values: resendState})
        let params = window.location.pathname
        let urlSlug = params.substring(7,params.length)

        let resent;
        await apiRequest({
            url: `/api/kid/v1/resend_otp/`,
            method: 'POST',
            data: JSON.stringify({
                phone_number: `${inputValue}`,
                college_slug: urlSlug
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            onSuccess: async (data) => {
                resent = data;
            },
            onError: (response) => {
                alert(response.data.error)
            }
        })

        return resent ? resent.status: resent;
    }

    const sendOtp = async () => {

        let data = {
            'username': `${inputValue}`,
        }

        Object.keys(data).forEach(
            key => (data[key] == null || data[key] == '') && delete data[key],
        );

        let otpGenerated;
        await apiRequest({
            url: `/api/auth/v1/send_otp/`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            },
            onSuccess: async (data) => {
                otpGenerated = data;
            },
            onError: (response) => {
                setError({...error, number: response.data.message});
            }
        })

        return otpGenerated ? otpGenerated.status: otpGenerated;
    }

    const handleOtp = (val, i) => {
        let values = [...otp.values];
        values[i] = val;
        if(values[values.length - 1] === ''){
            setError({...error,otp: ''})
        }
        setOtp({...otp, values: values});
    }

    const validateOtp = async (value) => {

        let otpVerified;
        if(value.length == 6){
            
            await apiRequest({
                url: `/api/auth/v1/login/`,
                method: 'POST',
                data: JSON.stringify({
                    'username': `${inputValue}`,
                    'otp_code': value,
                    "click_wrap":true
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                onSuccess: async (data) => {
                    otpVerified = data;
                },
                onError: (response) => {
                    setError({...error, otp: response.data.message});
                    setLoader(false)
                }
            })

        }

        return otpVerified;
    }

    const getOtpFromState = () => {
        return otp.values.join('');
    }

    const areAllFilled = () => {
        return getOtpFromState().length === 6;
    }

    const handleGenerateOtpButton = async (resend=false) => {
        if(resend){
            const resend = await resendOtp();
        } else {
            setLoader(true);
            setError({error, number: null});
            // if(isValid){
                const otpGenerated = await sendOtp();
                setOtp({...otp, generated: otpGenerated})
            // }
            setLoader(false);
        }
    }

    const handleProceedButton = async () => {
        setLoader(true);
        setError({error, number: null});

        const isOtpValid = await validateOtp(getOtpFromState());
        console.log(isOtpValid,"otp++")
        if (isOtpValid.status === true) {
            localStorage.setItem("token", String(isOtpValid?.token));
            localStorage.setItem("college", String(isOtpValid?.user_data?.institute
                ));
            navigate('/dashboard', {replace: true});
          }
        setLoader(false);
    }

    return (
        <div className='login'>
            {/* <img src={logo} className='logo'/> */}
            {!verified && !otp.generated &&
            <div className='container'>
                <div style={{width: '100%'}}>
                    <div className='header'>Login</div>
                
                <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                    <InputField 
                        placeholder={'Enter registered User Name'} 
                        validate={true}
                        validity={isValid}
                        inputType="text"
                        handleChange={handleInputChange}
                        error={error.number}
                    />
                </div>
                </div>
                <div className='bottom-container'>
                    <div className='message'>An OTP will be sent to the above number</div>
                    <div className={isValid ? 'small-wrapper': ''} style={{margin: '1.2rem 0 0'}}>
                        {!loader && 
                        <Button 
                            text={"Generate OTP"}
                            handleClick={handleGenerateOtpButton}
                            classes={`button-big button-primary`}
                        />
                        }
                        {loader && 
                            <div className="credenc-loader">
                                <TailSpin color="rgba(255, 255, 255, 0.7)" height={28} width={100}/>
                            </div>
                        }
                    </div>
                </div>
            </div>}

            {!verified && otp.generated &&
                <div className='wrapper container'>
                <div className='header-container'>
                    {/* <img src={logo} className='logo-small'/> */}
                </div>
                <div className='mid-container'>
                    <div className='header'>Verify OTP</div>
                    {/* <div className='subline'>Please check message on xxxxxx{getLastFourDigits()}</div> */}
                    <div className='label'>OTP</div>
                    <OtpField
                        handleChange={(val, i) => handleOtp(val, i)} 
                        otp={otp} 
                        error={error.otp}
                    />
                </div> 
                <div className='bottom-container'>
                    <div className='resend-otp-container'>
                        <div className='message-left'>Didn't receive an OTP?</div>
                        <div className='small-wrapper' style={{margin: '0.8rem 0'}}>
                            <Button 
                                text={"Resend OTP"} 
                                handleClick={() => handleGenerateOtpButton(true)}
                                counterValue={20}
                                counterText={"Resend in"}
                                classes='button-big button-secondary'
                            />
                        </div>
                    </div>
                    <div className={areAllFilled() ? `small-wrapper`: ''} style={{margin: '1.2rem 0 0'}}>
                    {!loader && <Button 
                        text='Proceed'
                        handleClick={handleProceedButton}
                        classes={`${areAllFilled() ? '' : 'disabled'} button-big button-primary`}
                    />}
                    {loader && 
                        <div className="credenc-loader">
                            <TailSpin color="rgba(255, 255, 255, 0.7)" height={28} width={100}/>
                        </div>
                    }
                    </div>
                </div>
            </div>}
        </div>
    )
}