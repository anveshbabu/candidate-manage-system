import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
export const NormalCheckbox = (props) => {

    let {
        className = '',
        id = Math.random(),
        label = '',
        errorMessage = '',
        materialUi = true,
        checked = false
    } = props;

    return (
        materialUi ?
            <FormControl error={!!errorMessage} className={`mb-3`}>
                <FormControlLabel
                    control={
                        <Checkbox {...props} />
                    }
                    label={label}
                />
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </FormControl> : <div className={`mb-3 form-check ${className}`}>
                <input {...props} className="form-check-input" type="checkbox" checked={checked} value="" id={id} />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </div>
    )
}

