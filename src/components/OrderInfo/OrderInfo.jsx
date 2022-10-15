import styles from './OrderInfo.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
import { useLocation} from 'react-router-dom'

export const OrderInfo = () => {
    const location = useLocation();

    return (
        <div className={`${styles.section}`}>
            {   ((location.state?.background.pathname !== '/profile/orders') && (location.state?.background.pathname !== '/feed')) &&
                <h1 className={`${styles.number} text text_type_digits-default`}>#034533</h1>
            }
            <h2 className='text text_type_main-medium mt-10 mb-3'>Black Hole Singularity острый бургер</h2>
            <p className={`${styles.status} text text_type_main-default`}>Выполнен</p>
            <h3 className='text text_type_main-medium mb-6 mt-15'>Состав:</h3>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    <div className={`${styles.ingredient} mr-8`}>
                        <div className={`${styles.wrapper}`}>
                            <img className={`${styles.image}`} src={bun} alt='bun'/>
                            <p className='text text_type_main-default ml-4 mr-4'>Флюоресцентная булка R2-D3</p>
                        </div>
                        <div className={`${styles.total}`}>
                            <p className={`${styles.cost} text text_type_digits-default`}>2 x 480</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </Scrollbars>
            </div>
            <div className={`${styles.info} mt-10`}>
                <p>Вчера, 13:50 i-GMT+3</p>
                <div className={`${styles.total}`}>
                    <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
} 