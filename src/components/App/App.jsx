import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import {useState, useEffect} from "react"
import { apiLink } from '../../utils/constants';
import { DataContext } from '../../services/dataContext';
import { BunContext } from '../../services/bunContext'

export const App = () => {
	//состояние для полученных ингредиентов
  	const [ingreedients, setIngredients] = useState([]);
  	const [ingredientsError, setIngredientsError] = useState('');
	const [bun, setBun] = useState({});
  	//состояния для модальных окон
  	const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  	const [showOrderDetails, setShowOrderDetails] = useState(false);
  	//состояние для данных ингредиента
  	const [infoIngredient, setInfoIngredient] = useState({});
  
  	//запрос к Апи
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
	  	setShowOrderDetails(true)
  	}
	console.log(bun);
  	return (
		<div className={styles.app}>
		<AppHeader/>
		<main className={styles.main}>
		{ (ingreedients.length && !ingredientsError) &&
			<DataContext.Provider value={{ingreedients}}>
				<BunContext.Provider value={{bun, setBun}}>
				{/* { (ingreedients.length && !ingredientsError) && */}
					<BurgerIngredients data={ingreedients} openModalIngredient={openModalIngredient}></BurgerIngredients>
				{/* } */}
				{/* {ingredientsError &&
					<p>Ошибка получения данных с сервера</p>
				} */}
				{/* { (ingreedients.length && !ingredientsError) && */}
					<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
				{/* } */}
				{/* {ingredientsError &&
					<p>Ошибка получения данных с сервера</p>
				} */}
				</BunContext.Provider>
			</DataContext.Provider>
		}
		{ingredientsError &&
					<p>Ошибка получения данных с сервера</p>
				}
		</main>
			{showOrderDetails && (
				<Modal handleClose={closeModals} title="">
					<OrderDetails />
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

