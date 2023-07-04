import React, { useEffect, useState } from 'react';
import './checklist.css';

import plusIcon from '../../assets/Icons/plusIcon.svg';
import caretDown from '../../assets/Icons/caretDown.svg';

export function Checklist({
    list=[],
    type,
    selected=new Array(list.length).fill(null),
    onSelect,
    expanded
}) {

    const [selectedChoices, setSelectedChoices] = useState([...selected]);


    const handleClick = (item, index) => {
        let choices = [...selectedChoices];
        if(choices[index] == null){
            choices[index] = item;
        } else {
            choices[index] = null;
        }

        setSelectedChoices(choices);

        if(onSelect != null){
            onSelect(choices);
        }
    }

  return (
    <div className={`column checklist-container ${expanded ? 'checklist-expanded' : ''}`}>
        {list.map((item, index) => (
            <div 
                key={`${item['label']}-${index}`} 
                className='row list-item'
                style={{gap: '10px'}}
                onClick={() => handleClick(item, index)}
            >
                <input type={'checkbox'} className='checkbox' checked={selectedChoices[index] != null} /> 
                <div className='label text-montserrat text-16'>{item['label']}</div>
            </div>
        ))}
    </div>
  )
}

export const checklistTypes = {
    singleChoice: 1,
    multiChoice: 2
}


export function DropTitle({
    leadingIcon,
    trailingIcon,
    title,
    expanded,
    onClick
}) {

  return (
    <div className={`row droptitle ${expanded ? 'expanded' : ''}`} style={{gap: '10px'}} onClick={onClick}>
        {leadingIcon && <img src={leadingIcon} style={{width: '20px', height: '20px'}}/>}
        <div className='text-montserrat text-weight-5 text-16 title'>{title}</div>
        {trailingIcon && 
            <img 
                src={trailingIcon} 
                style={{
                    width: '20px', 
                    height: '20px', 
                    marginLeft: 'auto', 
                    transform: expanded ? 'rotate(-180deg)' : 'none',
                    transition: 'transform 0.3s'
                }}
            />
        }
    </div>
  )
}


export default function ChoiceBox({
    list,
    onSelect,
    title
}) {

    const [ expanded, setExpanded ] = useState(false);

  return (
    <div>
        <DropTitle 
            expanded={expanded}
            title={title}
            leadingIcon={plusIcon}
            trailingIcon={caretDown}
            onClick={() => setExpanded(!expanded)}
        />

        <Checklist 
            list={[...list]}
            onSelect={onSelect}
            expanded={expanded}
        />
    </div>
  )
}


