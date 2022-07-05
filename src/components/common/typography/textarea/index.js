import { TextField, FormControl } from '@mui/material';
export const NormaltextArea = (props) => {

    let {
        type = 'text',
        className = '',
        id = Math.random(),
        placeholder = 'Enter',
        label = '',
        errorMessage = '',
        materialUi = true,
        maxRows=2
    } = props;

    return (
        materialUi ?
            <FormControl fullWidth error={!!errorMessage} className={`mb-3`}>
                <TextField multiline={true}  maxRows={maxRows}  {...props} label={label} />
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </FormControl> : <div className={`mb-3 ${className}`}>
                <label className="form-label">{label}</label>
                <textarea  {...props} className="form-control" placeholder={placeholder} ></textarea>
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </div>
    )
}

