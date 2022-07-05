
import { Button } from '@mui/material';
export const NormalButton = (props) => {

    let {
        label = '',
        className = 'btn-primary',
        isLoader = false,
        disabled,
        variant = 'contained',
        materialUi = true
    } = props;

    return (
        materialUi ?
            <Button {...props} type="button" variant={variant} disabled={isLoader || disabled} className={`btn btn-lg ${className}`}>
                {isLoader && <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>}
                {label}</Button> : <button {...props} type="button" variant={variant} disabled={isLoader || disabled} className={`btn btn-lg ${className}`}>
                {isLoader && <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>}
                {label}</button>
    )
}
