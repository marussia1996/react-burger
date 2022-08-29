import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import {useState, useEffect, useReducer} from "react"
import { apiLink } from '../../utils/constants';
import { DataContext } from '../../services/dataContext';
import { BunContext } from '../../services/bunContext'
import { PriceContext } from '../../services/priceContext';
import { OrderContext } from '../../services/orderContext';

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
	//состояние для полученных ингредиентов
  	const [ingreedients, setIngredients] = useState([]);
  	const [ingredientsError, setIngredientsError] = useState('');
	const [bun, setBun] = useState({});
	const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);
	const [order, setOrder] = useState(null);
	const [orderError, setOrderError] = useState('');
  	//состояния для модальных окон
  	const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  	const [showOrderDetails, setShowOrderDetails] = useState(false);
  	//состояние для данных ингредиента
  	const [infoIngredient, setInfoIngredient] = useState({});
  
  	//запрос получения ингредиентов
  	const getIngredientData = () => {
		fetch(`${apiLink.url}`)
    	.then((res)=>{
        	if (res.ok) {
          		return res.json();
        	}
        	return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    	})
    	.then((resData) => {
      		setIngredients(resData.data)})
    	.catch(err => {
      		setIngredientsError(err)});     
  	}
	//запрос получение номера заказа
	const postOrderDetails = (ingridientsIdArray) => {
		fetch('https://norma.nomoreparties.space/api/orders', {
			method: 'POST',
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify({
      			ingredients: ingridientsIdArray,
    		}),
		})
		.then((res)=>{
        	if (res.ok) {
          		return res.json();
        	}
        	return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    	})
    	.then((resData) => {
      		setOrder(resData.order.number)})
    	.catch(err => {
      		setOrderError(err)});
	}	
  	//при монтировании запрашиваем данные
  	useEffect(() => {
    	getIngredientData();
  	},[]);

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

  	//открытие модального окна заказа
  	const openModalOrder = () => {
		postOrderDetails(ingreedients.map((ingredient)=> ingredient._id));
	  	setShowOrderDetails(true);
  	}
  	return (
		<div className={styles.app}>
		<AppHeader/>
		<main className={styles.main}>
		{ (ingreedients.length && !ingredientsError) &&
			<DataContext.Provider value={{ingreedients}}>
				<BunContext.Provider value={{bun, setBun}}>
					<PriceContext.Provider value={{priceState, priceDispatcher}}>
						<BurgerIngredients data={ingreedients} openModalIngredient={openModalIngredient}></BurgerIngredients>
						<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
					</PriceContext.Provider>
				</BunContext.Provider>
			</DataContext.Provider>
		}
		{ingredientsError &&
					<p>Ошибка получения данных с сервера</p>
				}
		</main>
			{ (showOrderDetails && !orderError) && (
				
				<Modal handleClose={closeModals} title="">
					<OrderContext.Provider value={{order}}>
						<OrderDetails/>
					</OrderContext.Provider>
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

