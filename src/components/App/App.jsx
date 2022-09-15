import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import {useState, useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getIngreedients } from '../../services/actions/listIngredients'
import { CLOSE_MODAL, OPEN_MODAL } from '../../services/actions/ingredient';
import { getOrder } from '../../services/actions/order';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = () => {
	//значения из хранилища 
	const ingredientsRequest = useSelector(store=>store.listIngredients.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.listIngredients.ingredientsFailed);
	const order = useSelector(store=>store.order.order);
	const currentIngredient = useSelector(store=>store.ingredient.currentIngredient);
	const listIngredientId = useSelector(store=>store.currentIngredients.currentIngredients);
  	//состояния для модальных окон
  	const [showOrderDetails, setShowOrderDetails] = useState(false);

	//при монтировании запрашиваем данные
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngreedients());
    }, [dispatch]);	
  	//закрытие модальных окон 
  	const closeModalIngredient = () => {
    	dispatch({type: CLOSE_MODAL});
  	};
	const closeModalOrder = () => {
		setShowOrderDetails(false);
	}
  	//открытие модального окна ингредиента
  	const openModalIngredient = (ingredient) => {
		dispatch({type: OPEN_MODAL, payload: ingredient})
  	}
  	//открытие модального окна заказа
  	const openModalOrder = () => {
		dispatch(getOrder(listIngredientId));
	  	setShowOrderDetails(true);
  	}
  	return (
		<div className={styles.app}>
		<AppHeader/>
		{ (!ingredientsRequest && !ingredientsFailed) &&
			<main className={styles.main}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
					<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
				</DndProvider>
			</main>
		}
		{ingredientsFailed &&
					<p>Ошибка получения данных с сервера</p>
		}
			{ (showOrderDetails && order) && (
				<Modal handleClose={closeModalOrder} title="">
					<OrderDetails order={order}/>
				</Modal>
			)}
			{ (showOrderDetails && !order) && (
				<Modal handleClose={closeModalOrder} title="">
					<p>Ошибка получения номера заказа</p>
				</Modal>
			)}
			{currentIngredient && (
				<Modal title="Детали ингредиента" handleClose={closeModalIngredient}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</div>
  	);
}

