import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../components/loginButton/loginButton';
import InputField from '../../components/inputField/InputField';
import { TailSpin } from 'react-loader-spinner';
import { apiRequest } from '../../helpers/apiRequest.js';
import './login.css';

export default function Login() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: null, password: null });
    const [loader, setLoader] = useState(false);

    const handleInputChange = (field, value) => {
        setCredentials({ ...credentials, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const handleLogin = async () => {
        const { username, password } = credentials;

        if (!username || !password) {
            setErrors({
                username: !username ? 'Username is required' : '',
                password: !password ? 'Password is required' : ''
            });
            return;
        }

        setLoader(true);
        await apiRequest({
            url: `/api/auth/v1/dashboard/login/`,
            method: 'POST',
            data: JSON.stringify({ 
                username, 
                password,
                "click_wrap":true
            }),
            headers: { 'Content-Type': 'application/json' },
            onSuccess: async (data) => {
                localStorage.setItem("token", String(data?.token));
                localStorage.setItem("college", String(data?.user_data?.institute));
                navigate('/dashboard', { replace: true });
            },
            onError: (response) => {
                setErrors({ ...errors, password: response.data.message });
                setLoader(false);
            }
        });
    };

    return (
        <div className='login'>
            <div className='container'>
                <div style={{ width: '100%' }}>
                    <div className='header' style={{marginBottom : 24}}>Login</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <InputField 
                            placeholder='Enter Username' 
                            inputType="text"
                            handleChange={(value) => handleInputChange('username', value)}
                            error={errors.username}
                        />
                        <InputField 
                            placeholder='Enter Password' 
                            inputType="password"
                            handleChange={(value) => handleInputChange('password', value)}
                            error={errors.password}
                        />
                    </div>
                </div>
                <div className='bottom-container'>
                    <div className={credentials.username && credentials.password ? 'small-wrapper' : ''} style={{ margin: '1.2rem 0 0' }}>
                        {!loader ? 
                            <Button 
                                text="Proceed"
                                handleClick={handleLogin}
                                classes={`button-big button-primary`}
                            />
                            : 
                            <div className="credenc-loader">
                                <TailSpin color="rgba(255, 255, 255, 0.7)" height={28} width={100} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
