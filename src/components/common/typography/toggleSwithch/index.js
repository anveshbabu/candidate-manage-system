import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
export const NormalToggleSwitch = (props) => {
    let {
    
        className = '',
        id = Math.random(),
        label = '',
        errorMessage = '',
        checked = false,
        onChange='',
        disabled=false
    } = props;

    const [isChecked,setIsChecked]=useState(checked)

    
    const handleOnChange=()=>{
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <FormControlLabel  control={<Switch disabled={disabled} checked={isChecked} onChange={handleOnChange} />} label={label} />
    )
}

