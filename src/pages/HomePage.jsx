import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients';
import {Modal} from '../components/Modal/Modal';
import {IngredientDetails} from '../components/IngredientDetails/IngredientDetails';
import {OrderDetails} from '../components/OrderDetails/OrderDetailes';
import {useState, useEffect, useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getIngreedients } from '../services/actions/listIngredients';
import { CLOSE_MODAL, OPEN_MODAL } from '../services/actions/ingredient';
import { getOrder } from '../services/actions/order';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage() {
    //значения из хранилища 
	const ingredientsRequest = useSelector(store=>store.listIngredients.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.listIngredients.ingredientsFailed);
	const order = useSelector(store=>store.order.order);
	const orderRequest = useSelector(store=>store.order.orderRequest);
	const currentIngredient = useSelector(store=>store.ingredient.currentIngredient);
	const currentIngredients = useSelector(store=>store.currentIngredients.currentIngredients);
	const currentBun = useSelector(store=>store.currentIngredients.currentBun);
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
	//взятие всех Id выбранных ингредиентов
	const getIdIngredients = useCallback(() =>{
		return currentIngredients.map((ingredient)=>ingredient._id).concat(currentBun._id)
	}, [currentBun, currentIngredients]);
  	//открытие модального окна заказа
  	const openModalOrder = () => {
		dispatch(getOrder(getIdIngredients()));
	  	setShowOrderDetails(true);
  	}
  	return (
        <>
		{ (!ingredientsRequest && !ingredientsFailed) &&
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
					<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
				</DndProvider>
		}
		{ingredientsFailed &&
					<p>Ошибка получения данных с сервера</p>
		}
			{ (showOrderDetails && order && !orderRequest) && (
				<Modal handleClose={closeModalOrder} title="">
					<OrderDetails order={order}/>
				</Modal>
			)}
			{ (showOrderDetails && !order && !orderRequest) && (
				<Modal handleClose={closeModalOrder} title="">
					<p>Ошибка получения номера заказа</p>
				</Modal>
			)}
			{currentIngredient && (
				<Modal title="Детали ингредиента" handleClose={closeModalIngredient}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
        </>
  	);
}