import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from '../../services/actions/wsAllOrders'
import { ListOrders } from '../ListOrders/ListOrders'
import { WorkOrders } from '../WorkOrders/WorkOrders'
import styles from './OrderFeed.module.css'
export const OrderFeed = ({openModalOrderInfo}) =>{
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