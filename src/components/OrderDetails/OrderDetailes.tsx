import styles from './OrderDetails.module.css'
import image from '../../images/done.png'
import { FC } from 'react';

export const OrderDetails: FC<{order: number}> = ({order}) => {
    return (
            <div className={`${styles.container} pb-20 pt-4`}>
            <ul className={`${styles.list}`}>
                <li className={`${styles.item} ${styles.number} pb-8`}>
                    <h2 className='text text_type_digits-large'>
                        {`${order}`}
                    </h2>
                </li>
                <li className={`${styles.item}`}>
                    <p className={`${styles.paragrath} text text_type_main-medium`}>
                        идентификатор заказа 
                    </p>
                </li>
                <li className={`${styles.item} pb-15 pt-15`}>
                    <img src={`${image}`} alt='готово'/>
                </li>
                <li className={`${styles.item} pb-2`}>
                    <p className={`${styles.paragrath} text text_type_main-default`}>
                        Ваш заказ начали готовить
                    </p>
                </li>
                <li className={`${styles.item}`}>
                    <p className={`${styles.paragrath} text text_type_main-default text_color_inactive`}>
                        Дождитесь готовности на орбитальной станции 
                    </p>
                </li>
            </ul>
        </div>
    
    )
}