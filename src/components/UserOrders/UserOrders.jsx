import styles from './UserOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { CardOrder } from '../CardOrder/CardOrder'
import { NavProfile } from '../NavProfile/NavProfile';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { wsConnectionClosedUserOrders, wsConnectionOpenUserOrders } from '../../services/actions/wsUserOrders';
import { useSelector } from 'react-redux';

export const UserOrders = ({openModalOrderInfo}) =>{
    
    const orders = useSelector(store=>store.wsUserOrders.userOrders);
    console.log(orders);
    return (
        <section className={`${styles.container}`}>
            <div className={`${styles.nav}`}>
                <NavProfile/>
            </div>
            
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    {
                        useMemo(()=>
                            orders.map((order)=>(
                                <CardOrder key={order._id} openModalOrderInfo={openModalOrderInfo} order={order} status={true}/>
                            )),[orders, openModalOrderInfo])
                    }
                    {
                        orders.length === 0 && 
                            <p className='text text_type_main-default pl-10'>Нет заказов</p>
                        
                    }                    
                    
                </Scrollbars>
            </div>
        </section>
    )
}