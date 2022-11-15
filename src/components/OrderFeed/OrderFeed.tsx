import { FC, useEffect } from 'react'
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from '../../services/actions/wsAllOrders'
import { ListOrders } from '../ListOrders/ListOrders'
import { WorkOrders } from '../WorkOrders/WorkOrders'
import styles from './OrderFeed.module.css'
import { useDispatch } from '../../services/hooks/useDispatch&Selector'
type TOrderFeedProps = {
    openModalOrderInfo: ()=>void;
}
export const OrderFeed: FC<TOrderFeedProps> = ({openModalOrderInfo}) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(wsConnectionOpenAllOrders())
        return () => {
            dispatch(wsConnectionClosedAllOrders())
        }
    }, [dispatch])
    return (
        <section className={`${styles.section}`}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
            <main className={`${styles.main}`}>
                <ListOrders openModalOrderInfo={openModalOrderInfo}/>
                <WorkOrders/>
            </main>
        </section>
    )
}