import React from 'react';
import './search.css';
import searchIcon from '../../assets/Icons/searchIcon.svg';

export default function Search({
    placeholder='',
    onChange
}) {

  return (
    <div className='searchbar'>
        <label htmlFor='search-input'><img src={searchIcon} /></label>
        <input
            onChange={(e) => onChange(e.target.value)}
            id='search-input' 
            className='text-14 text-montserrat text-weight-5' 
            placeholder={placeholder}
            style={{background: 'transparent'}}
        />
    </div>
  )
}
