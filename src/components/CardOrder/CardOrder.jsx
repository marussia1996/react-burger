import styles from './CardOrder.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import uuid from 'react-uuid'
export const CardOrder = ({openModalOrderInfo, status, order}) =>{
    const location = useLocation();
    
    // const match = useRouteMatch();
    // console.log(match);
    // const allOrders = useSelector(store=>store.wsAllOrders.orders);
    // const userOrders = useSelector(store=>store.wsUserOrders.orders);
    // let orders;
    // if(match.url === '/feed'){
    //     orders = allOrders;
    // }
    // else if(match.url === '/profile/orders'){
    //     orders = userOrders;
    // }
    // console.log(orders)
    const orderDate = new Date(order.createdAt);
    const isToday = () =>{
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (orderDate.valueOf() < today - 86400000) {
            // раньше чем вчера
            const delta = now.getTime()-orderDate.getTime();
            return Math.floor(delta/1000/60/60/24)+" дней назад";
        } else if (orderDate < today) {
            // вчера
            return 'Вчера'
        } else {
            // сегодня
            return 'Сегодня'
        }
    }
    const formatDate = () =>{
        return `${isToday()}, 
                ${orderDate.getHours()}:${orderDate.getMinutes() >= 10 ? orderDate.getMinutes() :
                    `0${orderDate.getMinutes()}`} i-GMT+3`
    }
    const orderIngredients = order.ingredients;
    const allIngredients = useSelector(store=>store.listIngredients.ingredients);
    //поиск необходимых ингредиентов
    const filterIngredients = useMemo(() =>{
        return orderIngredients.map((ingredient)=>{
            return allIngredients.find((ingr) => ingredient === ingr._id)
        })
    },[orderIngredients, allIngredients]);
    //формирование массива объектов ингредиента
    const arrayIngredients = useMemo(()=>{
        return filterIngredients.map((el)=>{return el})
    },[filterIngredients]);
    //виден ли последний элемент
    let isVisibleCounter = false;
    let deltaCounter = 0;
    //видимые ингредиенты
    const visibleIngredients = useMemo(()=>{
        if(arrayIngredients.length > 6){
            deltaCounter = arrayIngredients.length - 6;
            isVisibleCounter = true;
            return arrayIngredients.splice(0,6);
        }
        else{
            return arrayIngredients
        }
    }, [arrayIngredients])
    //подсчет стоимости
    const totalPrice = useCallback(()=>{
        return ( arrayIngredients.reduce((acc, ingr) =>  acc +  ingr?.price , 0));
        },[arrayIngredients]);
    return(
        <Link className={`${styles.link}`} to={{
            pathname: `${location.pathname}/${order._id}`,
            state: { background: location }
        }}>
        <div className={`${styles.order} p-6 mr-4`} onClick={()=>{openModalOrderInfo()}}>
            <div className={`${styles.serviceInfo} mb-6`}>
                <p className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</p>
                <p className={`${styles.data} text text_type_main-default text_color_inactive`}>{formatDate()}</p>
            </div>
            <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>
            {status && <p className='text text_type_main-default mt-2'>{order.status}</p>}
            <div className={`${styles.detailInfo} mt-6`}>
                <div className={`${styles.ingredients} mr-6`}>
                    { visibleIngredients &&
                        visibleIngredients.map((ingredient)=>(
                            <img key={uuid()} className={`${styles.ingredient}`} src={ingredient?.image} alt={`${ingredient?.name}`}/>))
                    }
                    {isVisibleCounter &&
                        <div className={`${styles.counter}`}>
                            <p className={`${styles.textCounter} text text_type_main-default`}>{`+${deltaCounter}`}</p>
                        </div>
                    }                                                                  
                </div>
                <div className={`${styles.total}`}>
                    <p className={`${styles.cost} text text_type_digits-default`}>{totalPrice()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    )
}