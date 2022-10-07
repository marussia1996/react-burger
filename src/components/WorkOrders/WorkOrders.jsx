import styles from './WorkOrders.module.css'
export const WorkOrders = () =>{
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.ordersList} mb-15`}>
                <div className={`${styles.readyOrders} mr-9`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h2>
                        <ul className={`${styles.list}`}>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>                    
                        </ul>
                </div>
                <div className={`${styles.inWorkOrders}`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h2>
                        <ul className={`${styles.list}`}>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                            <li className={`${styles.item} text text_type_digits-default`}>044444</li>
                        </ul>
                </div>
            </div>
            <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</h2>
            <p className={`${styles.count} text text_type_digits-large mb-15`}>28 752</p>
            <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h2>
            <p className={`${styles.count} text text_type_digits-large`}>138</p>
        </div>
    )
}