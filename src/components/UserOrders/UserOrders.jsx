import styles from './UserOrders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { CardOrder } from '../CardOrder/CardOrder'
import { NavProfile } from '../NavProfile/NavProfile';

export const UserOrders = ({openModalOrderInfo}) =>{
    return (
        <section className={`${styles.container}`}>
            <div className={`${styles.nav}`}>
                <NavProfile/>
            </div>
            
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