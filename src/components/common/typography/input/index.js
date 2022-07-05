import { TextField, FormControl } from '@mui/material';
export const NormalInput = (props) => {

    let {
        type = 'text',
        className = '',
        placeholder = 'Enter',
        label = '',
        errorMessage = '',
        materialUi = true,
    } = props;

    return (
        materialUi ?
            <FormControl fullWidth error={!!errorMessage} className={`mb-3`}>
                <TextField  {...props} label={label} />
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </FormControl> : <div className={`mb-3 ${className}`}>
                <label className="form-label">{label}</label>
                <input {...props} type={type} className="form-control" placeholder={placeholder} />
                {!!errorMessage && <div className="form-text text-danger">{errorMessage}</div>}
            </div>
    )
}

