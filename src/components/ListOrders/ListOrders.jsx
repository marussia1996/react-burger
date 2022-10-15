import styles from './ListOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
import { Link, useLocation } from 'react-router-dom'

export const ListOrders = ({openModalOrderInfo}) =>{
    const location = useLocation();
    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    <Link className={`${styles.link}`} to={{
                        pathname: `/feed/${11}`,
                        state: { background: location, title: '#034535' }
                    }}>
                        <div className={`${styles.order} p-6 mr-2`} onClick={()=>{openModalOrderInfo()}}>
                            <div className={`${styles.serviceInfo} mb-6`}>
                                <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                                <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                            </div>
                            <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                            <div className={`${styles.detailInfo} mt-6`}>
                                <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredients} mr-6`}>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <img className={`${styles.ingredient}`} src={bun} alt='bun'/>
                                    <div className={`${styles.counter}`}>
                                        <p className={`${styles.textCounter} text text_type_main-default`}>+3</p>
                                    </div>                                                                  
                                </div>                               
                                </div>
                                <div className={`${styles.total}`}>
                                    <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </Scrollbars>
            </div>
        </section>
    )
}