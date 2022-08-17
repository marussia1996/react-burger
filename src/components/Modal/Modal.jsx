import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';
import { createPortal } from 'react-dom';
import styles from "./Modal.module.css";
const modalRoot = document.querySelector("#react-modals");

function Modal({handleClose, children }){
    
    const handleEscKeyDown = (e) => {
        e.key === "Escape" && handleClose();
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeyDown);
        return () => {
            document.removeEventListener('keydown', handleEscKeyDown);
        }
    }, []);

    return createPortal(
        (
            <>
                <div className={styles.container}>
                    <button className={styles.closeButton} type="button"> 
                        <CloseIcon type='primary' onClick={handleClose}/>
                    </button>
                    {children} 
                </div>
                <ModalOverlay handleClick={handleClose} /> 
            </>
        ), 
        modalRoot
    );
}
export default Modal;