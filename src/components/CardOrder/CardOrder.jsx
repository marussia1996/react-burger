import styles from './CardOrder.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun-01.svg'
import { Link, useLocation } from 'react-router-dom'
export const CardOrder = ({openModalOrderInfo, status, order}) =>{
    const location = useLocation();
    const orderDate = new Date(order.createdAt);
    const isToday = () =>{
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (orderDate.valueOf() < today - 86400000) {
            // раньше чем вчера
            const delta = now.getTime()-orderDate.getTime();
            return Math.floor(delta/1000/60/60/24)+" дней";
        } else if (orderDate < today) {
            // вчера
            return 'Вчера'
        } else {
            // сегодня
            return 'Сегодня'
        }
    }
    const formatDate = () =>{
        return `${isToday()}, 
                ${orderDate.getHours()}:${orderDate.getMinutes() >= 10 ? orderDate.getMinutes() :
                    `0${orderDate.getMinutes()}`} i-GMT+3`
    }
    return(
        <Link className={`${styles.link}`} to={{
            pathname: `${location.pathname}/${order._id}`,
            state: { background: location, title: `#${order.number}` }
        }}>
        <div className={`${styles.order} p-6 mr-4`} onClick={()=>{openModalOrderInfo()}}>
            <div className={`${styles.serviceInfo} mb-6`}>
                <p className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</p>
                <p className={`${styles.data} text text_type_main-default text_color_inactive`}>{formatDate()}</p>
            </div>
            <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>
            {status && <p className='text text_type_main-default mt-2'>{order.status}</p>}
            <div className={`${styles.detailInfo} mt-6`}>
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
                <div className={`${styles.total}`}>
                    <p className={`${styles.cost} text text_type_digits-default`}>480</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    )
}