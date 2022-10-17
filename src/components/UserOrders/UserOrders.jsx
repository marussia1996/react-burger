import styles from './UserOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { exit } from '../../services/actions/user';
import { deleteCookie } from '../../utils/cookie';
import { CardOrder } from '../CardOrder/CardOrder'
export const UserOrders = ({openModalOrderInfo}) =>{
    const location = useLocation();
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
                    
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        <CardOrder openModalOrderInfo={openModalOrderInfo} status={true}/>
                        
                    
                </Scrollbars>
            </div>
        </section>
    )
}