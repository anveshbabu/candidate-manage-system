import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NormalButton } from '../button'
import deleteImage from './assets/delete.svg'
import sucessImage from './assets/sucess.svg'
import './alert.scss';
export const NormalAlert = (props) => {

    let {
        className = '',
        isShow = false,
        toggle = '',
        children = '',
        title = '',
        backdrop = true,
        alertType = "warning",
        onClick,
        isLoader=false
    } = props;


    const handleAlertImage = () => {
        switch (alertType) {
            case 'warning':
                return deleteImage;
                break;
            case 'sucess':
                return sucessImage;
                break;
            default:
                return deleteImage;
        }
    }
    return (
        <Modal
            isOpen={isShow}
            toggle={toggle}
            backdrop={backdrop}
            className={`itrain-modal ${className}`}
        >
            <div className="modal-content">
                <div className="modal-body text-center">
                    <button type="button" className="btn-close float-end" onClick={toggle}></button>
                    <img className='mb-3' src={handleAlertImage()} />
                    {/* {children} */}
                    <h4 className='alert-title'>{title}</h4>
                    <p>lorem impulse lorem impulse lorem impulse</p>
                </div>
                <div className="modal-footer justify-content-center">
                    <NormalButton disabled={isLoader} onClick={()=>onClick(false)} color="error" label='CANCEL' className='me-3' />
                    <NormalButton  isLoader={isLoader} onClick={()=>onClick(true)}  label='YES, DELETE' />
                </div>
            </div>
        </Modal>
    )
}

