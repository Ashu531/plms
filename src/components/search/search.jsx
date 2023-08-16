import React, { useEffect } from 'react';
import './search.css';
import searchIcon from '../../assets/Icons/searchIcon.svg';

export default function Search({
    placeholder='',
    onChange,
    removeSearchQuery,
    query
}) {

  const handleChange=(e)=>{
    if(query.length > 0){
      onChange(e.target.value)
    }else{
      onChange('')
    }
  }

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
        {/* {
          query.length > 0 &&
          <div className='close-icon-content' onClick={()=>removeSearchQuery()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#b3b3b3" viewBox="0 0 256 256"><path d="M162.83,98.83,133.66,128l29.17,29.17a4,4,0,0,1-5.66,5.66L128,133.66,98.83,162.83a4,4,0,0,1-5.66-5.66L122.34,128,93.17,98.83a4,4,0,0,1,5.66-5.66L128,122.34l29.17-29.17a4,4,0,1,1,5.66,5.66ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"></path></svg>
          </div>
        } */}
       
       
    </div>
  )
}
