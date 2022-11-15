import styles from './ListOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { CardOrder } from '../CardOrder/CardOrder'
import { FC, useMemo } from 'react'
import { useSelector } from '../../services/hooks/useDispatch&Selector';

type TListOrdersProps = {
    openModalOrderInfo: ()=>void;
}
export const ListOrders: FC<TListOrdersProps> = ({openModalOrderInfo}) =>{
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