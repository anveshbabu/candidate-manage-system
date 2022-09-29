import Select from 'react-select'
import './select.scss'
import { InputLabel, MenuItem, FormControl, Select as ReactMatSelect } from '@mui/material';
export const Normalselect = (props) => {

    let {
        options = [{ value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }],
        className = '',
        label = '',
        errorMessage = '',
        materialUi = true,
        size,
    } = props;

    return (
        materialUi ?
            <FormControl  className={` mb-3 ${className} ${size=== 'small' && 'small-search-input'}`} fullWidth error={!!errorMessage}>
                <InputLabel>{label}</InputLabel>
                <ReactMatSelect
                    label={label}
                    {...props}
                >
                    {options.map(({ value, label },i) =>
                        <MenuItem value={value} key={i}>{label}</MenuItem>
                    )}
                </ReactMatSelect>
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </FormControl>

            : <div className={`mb-3 ${className}`}>
                <label className="form-label">{label}</label>
                <select className="form-select" aria-label="Default select example">
                    {options.map(({ value, label },i) =>
                        <option value={value} key={i}>{label}</option>
                    )}

                </select>
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </div>
    )
}