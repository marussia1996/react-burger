import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import {useState, useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getIngreedients, getOrder } from '../../services/actions/data'

export const App = () => {
	//значения из хранилища 
	const ingredientsRequest = useSelector(store=>store.data.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.data.ingredientsFailed);
	const order = useSelector(store=>store.data.order);

  	//состояния для модальных окон
  	const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  	const [showOrderDetails, setShowOrderDetails] = useState(false);
  	//состояние для данных ингредиента
  	const [infoIngredient, setInfoIngredient] = useState({});

	
	//при монтировании запрашиваем данные
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngreedients());
    }, [dispatch]);	

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
		{ (!ingredientsRequest && !ingredientsFailed) &&
			<main className={styles.main}>
				<BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
				<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
			</main>
		}
		{ingredientsFailed &&
					<p>Ошибка получения данных с сервера</p>
		}
			{ (showOrderDetails && order) && (
				<Modal handleClose={closeModals} title="">
					<OrderDetails order={order}/>
				</Modal>
			)}
			{ (showOrderDetails && !order) && (
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

