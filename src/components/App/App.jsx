import {AppHeader} from '../AppHeader/AppHeader';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from '../../pages/HomePage'; 
import { LoginPage } from '../../pages/LoginPage';
import {RegisterPage} from '../../pages/RegisterPage';
import { RepairPasswordPage } from '../../pages/RepairPasswordPage'
import { ResetPasswordPage } from '../../pages/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { getUser, updateToken } from '../../services/actions/user';
export const App = () => {
	const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
	const authToken = getCookie('authToken');
    const refreshToken = getCookie('refreshToken');
    const tokenSuccess = useSelector(store => store.user.tokenSuccess);

	useEffect(() => {
        if (!user && authToken && refreshToken) {
			console.log('нет юзера')
            dispatch(getUser());
        }
         if (!authToken && refreshToken) {
			console.log('нет токена')
            dispatch(updateToken());
        }
         if (authToken && tokenSuccess && refreshToken && !user) {
			console.log('нет юзера и был запрос на сервер за токеном')
            dispatch(getUser());
        }
    }, [dispatch, refreshToken, user, authToken, tokenSuccess]);

	return (
		<div className={styles.app}>
			<AppHeader/>
			<main className={styles.main}>
			<Switch>
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
				<Route exact path="/">
					<HomePage />
				</Route>
			</Switch>
		</main>
	</div>
	)
}

