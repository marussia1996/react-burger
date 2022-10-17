import styles from './ListOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { CardOrder } from '../CardOrder/CardOrder'

export const ListOrders = ({openModalOrderInfo}) =>{
    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>

                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>
                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>
                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>
                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>
                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>
                    <CardOrder openModalOrderInfo={openModalOrderInfo} status={false}/>

                </Scrollbars>
            </div>
        </section>
    )
}