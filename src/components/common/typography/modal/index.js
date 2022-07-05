import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modal.scss';
export const NormalModal = (props) => {

    let {
        className = '',
        isShow = false,
        toggle = '',
        children = '',
        title='',
        backdrop=true
    } = props;

    return (
        <Modal
            isOpen={isShow}
            toggle={toggle}
            backdrop={backdrop}
            className={`itrain-modal ${className}`}
        >
            <div className="modal-content">
              {!!title && <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </div>}
                <div className="modal-body">
                   {children}
                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div> */}
            </div>
        </Modal>
    )
}

