import React, { useEffect, useState } from 'react';
import './checklist.css';

import plusIcon from '../../assets/Icons/plusIcon.svg';
import caretDown from '../../assets/Icons/caretDown.svg';


export default function ChoiceBox({
    list,
    onSelect,
    title
}) {

    const [ expanded, setExpanded ] = useState(false);

  return (
    <div style={{position: 'relative', width: '100%'}}>
        <Checklist 
            list={[...list]}
            onSelect={onSelect}
            expanded={expanded}
        />
        <DropTitle 
            expanded={expanded}
            title={title}
            leadingIcon={plusIcon}
            trailingIcon={caretDown}
            onClick={() => setExpanded(!expanded)}
        />
    </div>
  )
}

export function Checklist({
    list=[],
    type,
    selected=[],
    onSelect,
    expanded
}) {

    const [selectedChoices, setSelectedChoices] = useState(new Set([...selected]));


    const handleClick = (item, index) => {
        if(selectedChoices.has(item)){
            setSelectedChoices(prev => {prev.delete(item); return new Set(prev);})
        } else {
            setSelectedChoices(prev => new Set(prev.add(item)));
        }

    }

    useEffect(() => {
        if(onSelect != null){
            onSelect(selectedChoices.values());
        }
    }, [selectedChoices])

  return (
    <div className={`column checklist-container ${expanded ? 'checklist-expanded' : ''}`}>
        {list.map((item, index) => (
            <div 
                key={`${item}-${index}`} 
                className='row list-item'
                style={{gap: '10px'}}
                onClick={() => handleClick(item, index)}
            >
                <input type={'checkbox'} className='checkbox' checked={selectedChoices.has(item)} /> 
                <div className='label text-montserrat text-16'>{item}</div>
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





