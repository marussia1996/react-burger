import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from "./Modal.module.css";
import {modalRoot} from '../../utils/constants';
import PropTypes from 'prop-types';

export const Modal = ({handleClose, title, children }) =>{
    const handleEsc = (e) => {
        if(e.key === "Escape"){
            handleClose();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, []);
    return createPortal(
        (
            <>
                <div className={styles.containerModal}>
                    <div className={`${styles.content} pl-10 pt-10 pr-10`}>
                        <h2 className='text text_type_main-large'>{title}</h2>
                        <button className={styles.closeButton} type="button"> 
                            <CloseIcon type='primary' onClick={handleClose}/>
                        </button>
                    </div>
                    {children} 
                </div>
                <ModalOverlay handleClick={handleClose} /> 
            </>
        ), 
        modalRoot
    );
};
Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}
