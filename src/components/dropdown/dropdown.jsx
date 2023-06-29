import React, { useEffect, useState } from 'react';
import './dropdown.css';

import { Label } from '../input/input.jsx';

export function Dropdown({
    label,
    items=[],
    required=false,
    showCheck=false,
    value,
    onChange,
    disabled,
    error,
    classes='',
    placeholder,
  }) {

    const defaultPlaceholder = 'Select';
    const [dropdownValue, setDropdownValue] = useState(placeholder ? placeholder : defaultPlaceholder);

    useEffect(() => {
        console.log("hdfbdjh", dropdownValue);
    }, [dropdownValue])

    return (
      <div className={`${classes} column`}style={{width: '100%', gap: '8px'}}>
  
        <Label showCheck={showCheck} error={error} label={label} required={required} />

        <div style={{textAlign: 'start'}}>
            <select
                onChange={(e) => onChange != null ? onChange(e.target.value) : setDropdownValue(e.target.value)}
                className="dropdown text-montserrat text-16 text-weight-5"
                disabled = {disabled}
                value={value ? value : dropdownValue}
                style={(value && value == -1) || (value == null && dropdownValue == placeholder) ? {color: '#8C8C8C'} : {}}
            >
                {placeholder && <option>{placeholder}</option>}
                {items.map((item, index) => (
                    <option key={index} value={item.value} disabled={item.disabled}>
                        {item.label}
                    </option>
                ))}
            </select>
    
            <div style={{textAlign: 'start'}}>
                <div className="input-error text-montserrat text-12" style={{visibility: error ? 'visible' : 'hidden'}}>{error || 'error'}</div>
            </div>
        </div>
      </div>
    );
  }