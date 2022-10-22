import styles from './ListOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { CardOrder } from '../CardOrder/CardOrder'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import PropTypes from "prop-types";

export const ListOrders = ({openModalOrderInfo}) =>{
    const orders = useSelector(store=>store.wsAllOrders.orders);
    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    {
                        useMemo(()=>
                            orders.map((order)=>(
                                <CardOrder key={order._id} openModalOrderInfo={openModalOrderInfo} order={order} status={false}/>
                            )),[orders, openModalOrderInfo])
                    }

                </Scrollbars>
            </div>
        </section>
    )
}
ListOrders.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};