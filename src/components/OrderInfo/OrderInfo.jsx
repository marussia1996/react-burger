import styles from './OrderInfo.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun from '../../images/bun.png'
import { useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatDate'
import { statusName } from '../../utils/statusOrder'
import { useCallback, useMemo } from 'react'
import { GET_INGREDIENTS_FAILED } from '../../services/actions/listIngredients'

export const OrderInfo = () => {
    const location = useLocation();
    const order = location.state.order;
    console.log(order);
    const isOpenModal = useSelector(store=>store.modal.isOpened)
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
    //проверка содержимого массива ингредиентов
    const validIngredients = useMemo(()=>{
        const valideArr = [];
        arrayIngredients.forEach((ingredient)=>{
            if(ingredient){
                valideArr.push(ingredient);
            }
        })
        return valideArr;
    },[arrayIngredients]);
    //подсчет вхождения ингредиента в массиве ингредиентов
    const amountIngredient = useCallback((ingredient) =>{
        let amount = 0;
        validIngredients.forEach((ingr)=>{
            if(ingr._id === ingredient._id){
                amount++;
            }
        })
        return amount;
    },[validIngredients])
    //содержится ли элемент в массиве
    const isIngredient = (arr, ingredient) =>{
            return arr.some((obj)=> 
                obj.data._id === ingredient._id
            )
    }
    //формирование валидного массива ингредиентов с их количеством
    const arrayIngredientsAndAmount = useMemo(() =>{
        const newArr = [];
        validIngredients.forEach((ingredient)=>{
            if(!isIngredient(newArr, ingredient)){
                newArr.push({data: ingredient, amount: amountIngredient(ingredient)});
            }
        })
        return newArr
    },[validIngredients, amountIngredient])
    
    //подсчет стоимости
    const totalPrice = useCallback(()=>{
        return ( validIngredients.reduce((acc, ingr) => acc +  ingr.price , 0));
        },[validIngredients]);
    return (
        <div className={`${styles.section}`}>
            {   !isOpenModal &&
                <h1 className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</h1>
            }
            <h2 className='text text_type_main-medium mt-10 mb-3'>{order.name}</h2>
            <p className={`${order.status === 'done' ? styles.doneColor : ''} text text_type_main-default`}>{statusName(order.status)}</p>
            <h3 className='text text_type_main-medium mb-6 mt-15'>Состав:</h3>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    { arrayIngredientsAndAmount &&
                        arrayIngredientsAndAmount.map((ingredient)=>(
                        <div key={ingredient.data._id} className={`${styles.ingredient} mr-8`}>
                            <div className={`${styles.wrapper}`}>
                                <img className={`${styles.image}`} src={ingredient.data.image} alt={`${ingredient.data.name}`}/>
                                <p className='text text_type_main-default ml-4 mr-4'>{`${ingredient.data.name}`}</p>
                            </div>
                            <div className={`${styles.total}`}>
                                <p className={`${styles.cost} text text_type_digits-default`}>{`${ingredient.amount} x ${ingredient.data.price}`}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                        ))
                    }
                </Scrollbars>
            </div>
            <div className={`${styles.info} mt-10`}>
                <p>{formatDate(order.createdAt)}</p>
                <div className={`${styles.total}`}>
                    <p className={`${styles.cost} text text_type_digits-default`}>{totalPrice()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
} 