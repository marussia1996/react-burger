import {AppHeader} from '../AppHeader/AppHeader';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from '../../pages/HomePage'; 
import { LoginPage } from '../../pages/LoginPage';
import {RegisterPage} from '../../pages/RegisterPage';
import { RepairPasswordPage } from '../../pages/RepairPasswordPage'
import { ResetPasswordPage } from '../../pages/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import {useEffect, useCallback, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { exit, getUser, updateToken } from '../../services/actions/user';
import { NotFound404Page } from '../../pages/NotFound404Page';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import { CLOSE_MODAL, OPEN_MODAL } from '../../services/actions/ingredient';
import { getOrder, OPEN_ORDER_MODAL } from '../../services/actions/order';
import { IngredientPage } from '../../pages/IngredientPage';
import {OrderFeedPage} from '../../pages/OrderFeedPage';
import { getIngreedients } from '../../services/actions/listIngredients';
import { deleteCookie } from '../../utils/cookie';
import { OrderInfoPage } from '../../pages/OrderInfoPage';
import { UserOrdersPage } from '../../pages/UserOrdersPage';
export const App = () => {
	const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
	const authToken = getCookie('authToken');
    const refreshToken = getCookie('refreshToken');
	const userFailed = useSelector(store=>store.user.userFailed);
	const expiredToken = useSelector(store=>store.user.expiredToken);
	const tokenFailed = useSelector(store=>store.user.tokenFailed);
	//при монтировании запрашиваем данные
	useEffect(() => {
		dispatch(getIngreedients());
	}, [dispatch]);	
	//если токен не валидный - обновляем, если не получилось обновить токен - выходим из системы, если была ошибка для получения данных пользователя - повторяем запрос
	useEffect(()=>{
		if(expiredToken && !tokenFailed){
			dispatch(updateToken());
		}
		if(expiredToken && tokenFailed){
			dispatch(exit());
			deleteCookie('authToken');
        	deleteCookie('refreshToken');
		}
		if(userFailed && !expiredToken){
			dispatch(getUser());
		}
	},[dispatch, expiredToken, userFailed, tokenFailed])
	//если user нет в сторе, и есть токены, то отправляем запрос на получение данных о user
	useEffect(() => {
        if (!user && authToken && refreshToken) {
            dispatch(getUser());
        }
    }, [dispatch, user, refreshToken, authToken]);
	//для открытия модальных окон
	const location = useLocation();
	const history = useHistory();
	const background = location.state && location.state?.background;
	const order = useSelector(store=>store.order.order);
	const orderRequest = useSelector(store=>store.order.orderRequest);
	const currentIngredients = useSelector(store=>store.currentIngredients.currentIngredients);
	const currentBun = useSelector(store=>store.currentIngredients.currentBun);
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
		if(user){
			dispatch(getOrder(getIdIngredients()));
			setShowOrderDetails(true);
		}
		else{
			history.push('/login');
		}
	}
	//открытие модального окна информации о заказе
	const openModalOrderInfo = () => {
		dispatch({type: OPEN_ORDER_MODAL});
	}
	//состояния для модальных окон
	const [showOrderDetails, setShowOrderDetails] = useState(false);
	//закрытие модальных окон 
	const closeModalIngredient = () => {
		dispatch({type: CLOSE_MODAL});
		history.replace('/');
	};
	const closeModalOrder = () => {
		setShowOrderDetails(false);
		history.replace('/');
	}
	const closeModalOrderInfo = () => {
		history.goBack();
	}
	return (
		<div className={styles.app}>
			<AppHeader/>
			<main className={styles.main}>
			<Switch location={background || location}>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path='/register'>
					<RegisterPage />
				</Route>
				<Route exact path='/forgot-password'>
					<RepairPasswordPage />
				</Route>
				<Route exact path='/reset-password'>
					<ResetPasswordPage/>
				</Route>
				<ProtectedRoute exact path='/profile'>
					<ProfilePage/>
				</ProtectedRoute>
				<ProtectedRoute exact path='/profile/orders'>
					<UserOrdersPage openModalOrderInfo={openModalOrderInfo}/>
				</ProtectedRoute>
				<Route exact path='/profile/orders/:id'>
					<div className="mt-30">
						<OrderInfoPage/>
					</div>
				</Route>
				<Route exact path='/ingredients/:id'>
					<IngredientPage />
				</Route>
				<Route exact path='/feed'>
					<OrderFeedPage openModalOrderInfo={openModalOrderInfo}/>
				</Route>
				<Route exact path='/feed/:id' render={() => {
						return (
							<div className="mt-40">
								<OrderInfoPage/>
							</div>
						)}}>
				</Route>
				<Route exact path="/">
					<HomePage openModalIngredient={openModalIngredient} openModalOrder={openModalOrder}/>
				</Route>
				<Route>
					<NotFound404Page/>
				</Route>
			</Switch>
			{background && 
				<Switch>
					<Route exact path="/ingredients/:id" render={() => {
						return (
							<Modal title="Детали ингредиента" handleClose={closeModalIngredient}>
								<IngredientDetails />
							</Modal>
							);
						}}>
					</Route>
					<Route exact path='/feed/:id'>
						<Modal title='' handleClose={closeModalOrderInfo}>
							<OrderInfoPage/>
						</Modal>
					</Route>
					<Route exact path='/profile/orders/:id'>
						<Modal title="" handleClose={closeModalOrderInfo}>
							<OrderInfoPage/>
						</Modal>
					</Route>
				</Switch>
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
		</main>
	</div>
	)
}

