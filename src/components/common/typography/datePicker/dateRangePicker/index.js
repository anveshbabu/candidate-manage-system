import DateRangePicker from 'react-bootstrap-daterangepicker';
import {IconButton,TextField ,FilledInput,OutlinedInput} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react'
import moment from 'moment';
export const NormalDateRangePicker = (props) => {
  const [value, setValue] = useState([null, null]);

  let {
    label = '',
    className = '',
    isLoader = false,
    disabled,
    variant = 'outlined',
    materialUi = true,
    position = "end",
    readOnly=true,
    id = Math.random(),
    startDate='',
    endDate='',
    onApply
  } = props;

  const handleEvent=(event, picker)=> {
    console.log(picker.startDate);
  }
  

  return (
    <FormControl variant={variant} className={className}>
      {/* <InputLabel htmlFor={id}>{label}</InputLabel> */}
      <DateRangePicker onEvent={handleEvent} onCallback={onApply} startDate={moment(startDate)?.format("DD/MM/YYYY")} endDate={moment(endDate)?.format("DD/MM/YYYY")}>
        <FilledInput 
          {...props}
          id={id}
                    readOnly={readOnly}
          endAdornment={
            <InputAdornment position={position}>
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </DateRangePicker>


    </FormControl>

  )
}