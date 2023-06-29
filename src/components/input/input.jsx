import React, { useState } from "react";
import './input.css';

import errorIcon from '../../assets/Icons/cross.svg';
import checkIcon from '../../assets/Icons/check.svg';

export function Input({
  autoFocus = false,
  label,
  required=false,
  showCheck=false,
  placeholder,
  value,
  onChange,
  disabled,
  onEnter,
  error,
  type = "text",
  classes='',
  maxLength=100
}) {

  const [inputValue, setInputValue] = useState('');

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      onEnter();
    }
  };

  const inputChange = e => {
    let currValue = e.target.value;

    if (type == "number") {

      onChange != null ? onChange(currValue) : setInputValue(currValue.trim());

    } 
    
    else onChange != null ? onChange(currValue) : setInputValue(currValue);

  }

  return (
    <div className={`${classes} column`}style={{width: '100%', gap: '8px'}}>

      <Label showCheck={showCheck} error={error} label={label} required={required} />

      <div style={{textAlign: 'start'}}>
        <input
          className="input text-montserrat text-16 text-weight-5"
          placeholder={placeholder}
          value={value ? value : inputValue}
          onChange={inputChange}
          disabled={disabled}
          autoFocus={autoFocus ? true : false}
          onKeyDown={handleKey}
          type={type}
          maxLength={maxLength}
          onWheel={(e) => e.target.blur()}
          style={
            {border: error ? '1px solid #DE3B4F' : '1px solid #EAEAEA'}
          }
        ></input>
        <div className="input-error text-montserrat text-12" style={{visibility: error ? 'visible' : 'hidden'}}>{error || 'error'}</div>
      </div>
    </div>
  );
}

export function Label({
  showCheck,
  error,
  label,
  required
}) {
  return (
    <div className="row label text-montserrat text-12 text-weight-5" style={{gap: '5px'}}>
        <div className={required ? 'required' : ''}>{label}</div>

        {(error || showCheck) && <img 
          src={error ? errorIcon : checkIcon}
          style={{width: '14px', height: '14px'}}
        />}
    </div>
  );
}

