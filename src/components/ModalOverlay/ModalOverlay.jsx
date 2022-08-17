import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay({handleClick}){
    return (
            <div onClick={handleClick} className={styles.overlay}></div>
        );
};

ModalOverlay.propTypes = {
    handleClick: PropTypes.func.isRequired,
};
export default ModalOverlay;