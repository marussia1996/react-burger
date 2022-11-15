import styles from "./ModalOverlay.module.css";
import { FC } from 'react'
export type TModalOverlayProps={
    handleClick: ()=> void;
}
export const ModalOverlay: FC <TModalOverlayProps> = ({handleClick}) =>{
    return (
            <div onClick={handleClick} className={styles.overlay}></div>
        );
};