import { ListOrders } from '../ListOrders/ListOrders'
import { WorkOrders } from '../WorkOrders/WorkOrders'
import styles from './OrderFeed.module.css'
export const OrderFeed = () =>{
    return (
        <section className={`${styles.section}`}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
            <main className={`${styles.main}`}>
                <ListOrders/>
                <WorkOrders/>
            </main>
        </section>
    )
}