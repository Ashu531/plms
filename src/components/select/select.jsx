import React, { useState } from 'react';
import './select.css';

export function Select({ items = [], value, onChange, placeholder }) {
    const defaultPlaceholder = 'Select';
    const [dropdownValue, setDropdownValue] = useState(placeholder ? placeholder : defaultPlaceholder);

    return (
        <div className="column" style={{ width: '100%', gap: '8px' }}>
            <div style={{ textAlign: 'start', width: '100%' }}>
                <select
                    onChange={(e) => onChange ? onChange(e.target.value === placeholder ? '' : e.target.value) : setDropdownValue(e.target.value)}
                    className="dropdown text-montserrat text-16 text-weight-5"
                    value={value ? value : dropdownValue}
                    style={{
                        color: (value && value === -1) || (value == null && dropdownValue === placeholder) ? '#8C8C8C' : '#0B090D',
                        outline: '1px solid #EAEAEA',
                        background: '#ffffff',
                    }}
                >
                    {placeholder && <option className="placeholder">{placeholder}</option>}
                    {items.length > 0 && items.map((item, index) => (
                        <option key={index} value={item.id} disabled={false}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
