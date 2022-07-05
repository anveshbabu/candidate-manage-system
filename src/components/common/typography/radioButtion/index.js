import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
export const NormalRadioButtion = (props) => {

    let {
        className = '',
        id = Math.random(),
        errorMessage = '',
        materialUi = true,
        value = 'chocolate',
        row = true,
        options = [{ value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }],
        onChange = () => { },
        name = ''
    } = props;

    return (
        materialUi ?
            <FormControl error={!!errorMessage} className={`mb-3`}>
                <RadioGroup
                    defaultValue={value}
                    row={row}
                    onChange={onChange}
                >
                    {options.map(({ value, label },i) =>
                        <FormControlLabel value={value} name={name} key={i} control={<Radio />} label={label} />
                    )}
                </RadioGroup>
            </FormControl> : <div className='mb-3'>{options.map(({ value, label },i) => <div key={i} className={`form-check ${className} ${row ? 'form-check-inline' : ''}`}>
                <input className="form-check-input" type="radio" name={name} id={id} value={value} />
                <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>)}</div>
    )
}

