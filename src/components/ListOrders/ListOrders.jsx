import styles from './ListOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
export const ListOrders = () =>{
    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium mb-6`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.order} p-6 mr-2`}>
                        <div className={`${styles.serviceInfo} mb-6`}>
                            <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                        <div className={`${styles.detailInfo}`}>
                            <div className={`${styles.ingredients} mr-6`}>
                                <div className={`${styles.ingredient}`}>
                                    <img className={`${styles.image}`} src={bun} alt='bun'/>
                                </div>                               
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </section>
    )
}