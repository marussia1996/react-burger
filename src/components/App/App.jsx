import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import {useState, useEffect, useReducer, useMemo} from "react"
import { baseUrl } from '../../utils/constants';
import { BunContext } from '../../services/bunContext'
import { PriceContext } from '../../services/priceContext';
import { useSelector, useDispatch } from 'react-redux';
import { getIngreedients } from '../../services/actions/data'
const priceInitialState = { price: null };
function reducer(state, action){
  switch(action.type){
    case 'counting':
      	return {price: action.payload};
	case 'reset':
		return priceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}
export const App = () => {
	//значения о данных из хранилища 
	const ingredientsRequest = useSelector(store=>store.data.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.data.ingredientsFailed);
	//состояние для булки
	const [bun, setBun] = useState({});
	//состояние для цены
	const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);
	//состояние для заказа
	const [order, setOrder] = useState(null);
	const [orderError, setOrderError] = useState('');
  	//состояния для модальных окон
  	const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  	const [showOrderDetails, setShowOrderDetails] = useState(false);
  	//состояние для данных ингредиента
  	const [infoIngredient, setInfoIngredient] = useState({});
	//проверка ответа от сервера
	const checkResponse = (res) =>{
		if (res.ok) {
			return res.json();
	  	}
	  	return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
	}
	//запрос получение номера заказа
	const postOrderDetails = (ingridientsIdArray) => {
		fetch(`${baseUrl}/orders`, {
			method: 'POST',
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify({
      			ingredients: ingridientsIdArray,
    		}),
		})
		.then((res)=>checkResponse(res))
    	.then((resData) => {
      		setOrder(resData.order.number)})
    	.catch(err => {
      		setOrderError(err)});
	}
	//при монтировании запрашиваем данные
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngreedients());
    }, [dispatch]);	
	console.log('ingredientsRequest');
	console.log(ingredientsRequest);
	console.log('ingredientsFailed');
	console.log(ingredientsFailed);
  	//закрытие модальных окон
  	const closeModals = () => {
    	setShowIngredientDetails(false);
    	setShowOrderDetails(false);
  	};

  	//открытие модального окна ингредиента
  	const openModalIngredient = (ingredient) => {
		setInfoIngredient (ingredient)
    	setShowIngredientDetails(true);
  	}
	//const listIngredientId = useMemo(() => ingredients.map((ingredient)=> ingredient._id), [ingredients]);
  	//открытие модального окна заказа
  	const openModalOrder = () => {
		//postOrderDetails(listIngredientId);
	  	setShowOrderDetails(true);
  	}

  	return (
		<div className={styles.app}>
		<AppHeader/>
		<main className={styles.main}>
		{ (!ingredientsRequest && !ingredientsFailed) &&
			
				<BunContext.Provider value={{bun, setBun}}>
					<PriceContext.Provider value={{priceState, priceDispatcher}}>
						<BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
						<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
					</PriceContext.Provider>
				</BunContext.Provider>
			
		}
		{ingredientsFailed &&
					<p>Ошибка получения данных с сервера</p>
				}
		</main>
			{ (showOrderDetails && order) && (
				<Modal handleClose={closeModals} title="">
					<OrderDetails order={order}/>
				</Modal>
			)}
			{ (showOrderDetails && orderError) && (
				<Modal handleClose={closeModals} title="">
					<p>Ошибка получения номера заказа</p>
				</Modal>
			)}
			{showIngredientDetails && (
				<Modal title="Детали ингредиента" handleClose={closeModals}>
					<IngredientDetails ingredient={infoIngredient} />
				</Modal>
			)}
		</div>
  	);
}

