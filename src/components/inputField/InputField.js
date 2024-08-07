import React, { useEffect, useState } from 'react'
import './InputField.css'

export default function InputField({
    placeholder,
    validate=false,
    icon,
    handleChange,
    validity,
    error,
    maxLength=255,
    width='',
    height='',
    margin='',
    inputType='text',
    value,
    disabled=false,
}) {

    const [currentValue,setCurrentValue] = useState('')

    useEffect(()=>{
        setCurrentValue(value)
    },[value])

    return (
        <div style={{ width: '100%' }}>
            <div className='small-wrapper input-container' style={{width, height, margin}}>
                {icon && <img className='icon' src={icon} style={{margin: '0.4rem'}}/>}
                <input 
                    className='input-field' 
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                    maxLength={maxLength}
                    type={inputType}
                    value={currentValue}
                    disabled={disabled}
                    minLength={6}
                ></input>
                {/* {validate && validity && <img className='icon' src={check}/>} */}
            </div>
              {error && <div className='error'>
                {error}
            </div>}
        </div>
        
    )
}