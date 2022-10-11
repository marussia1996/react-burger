import styles from './UserOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { exit } from '../../services/actions/user';
import { deleteCookie } from '../../utils/cookie';
export const UserOrders = () =>{
    const dispatch = useDispatch();
    //выход из профиля
    const handleExit = (e) =>{
        dispatch(exit());
        deleteCookie('authToken');
        deleteCookie('refreshToken');
    }
    return (
        <section className={`${styles.container}`}>
            <nav className={`${styles.navigation}`}>
                <NavLink exact to='/profile' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Профиль</NavLink>
                <NavLink exact to='/profile/orders' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>История заказов</NavLink>
                <NavLink exact to={{ pathname: '/login', state: { from: true } }} onClick={handleExit} activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Выход</NavLink>
                <p className={`${styles.caption} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    <Link className={`${styles.link}`} to={{pathname: `/profile/orders/:${11}`}}>
                        <div className={`${styles.order} p-6 mr-2`}>
                            <div className={`${styles.serviceInfo} mb-6`}>
                                <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
                                <p className={`${styles.data} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                            </div>
                            <h2 className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
                            <p className='text text_type_main-default mt-2'>Создан</p>
                            <div className={`${styles.detailInfo} mt-6`}>
                                <div className={`${styles.ingredients} mr-6`}>
                                    <div className={`${styles.ingredient}`}>
                                        <img className={`${styles.image}`} src={bun} alt='bun'/>
                                    </div>
                                    <div className={`${styles.ingredient}`}>
                                        <img className={`${styles.image}`} src={bun} alt='bun'/>
                                    </div>  
                                    <div className={`${styles.ingredient}`}>
                                        <img className={`${styles.image}`} src={bun} alt='bun'/>
                                    </div>  
                                    <div className={`${styles.ingredient}`}>
                                        <img className={`${styles.image}`} src={bun} alt='bun'/>
                                    </div>  
                                    <div className={`${styles.ingredient}`}>
                                        <img className={`${styles.image}`} src={bun} alt='bun'/>
                                    </div>  
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
                    </Link>
                </Scrollbars>
            </div>
        </section>
    )
}