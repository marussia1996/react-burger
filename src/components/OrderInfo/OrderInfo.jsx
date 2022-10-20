import styles from './OrderInfo.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun.png'
import { useLocation, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from '../../services/actions/wsAllOrders'
import { useSelector } from 'react-redux'

export const OrderInfo = () => {
    const {id} = useParams();
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(wsConnectionOpenAllOrders())
    //     return () => {
    //         dispatch(wsConnectionClosedAllOrders())
    //     }
    // }, [dispatch])
    // const allOrders = useSelector(store=>store.wsAllOrders.orders);
    // const order = allOrders?.find((order)=>order._id === id);
    // console.log(order);
    // let statusOrder = ''
    // if(order.status === 'done'){
    //     statusOrder = 'Выполнен'
    // }
    // else{
    //     statusOrder = 'В работе'
    // }
    return (
        <div className={`${styles.section}`}>
            {/* {   
                <h1 className={`${styles.number} text text_type_digits-default`}>#034533</h1>
            } */}
            <h2 className='text text_type_main-medium mt-10 mb-3'>{}</h2>
            <p className={`${styles.status} text text_type_main-default`}>{}</p>
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