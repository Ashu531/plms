import React,{useEffect, useState} from 'react'
import './button.css'

export default function Button({
    text,
    count='',
    leadingIcon,
    style={},
    classes='',
    onClick,
    disabled=false,
    showTextOnHover=false,
    mobileButtonText='',
    linearGradient,
    theme,
    type
}) {

  const [buttonPressed,setButtonPressed] = useState(false)

  useEffect(() => {
    return () => {
      setButtonPressed(false)
    };
  }, []);


  const _handleButtonClick = () => {
    setButtonPressed(true)
    onClick()
  }

  return (
    <div className={`button-component ${disabled ? 'disable' : ''}`} style={classes} onClick={()=>_handleButtonClick()}> 
        {leadingIcon && <img src={leadingIcon}/>}
        {!!count && <div className={'text'}>{count}</div>}
        {text && <div className={showTextOnHover ? 'hideText text' : 'text'} style={type == 'Show' ? {color : '#FFFFFF'} : null }>{text}</div>}
    </div>
  )
}


