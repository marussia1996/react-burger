import {AppHeader} from '../AppHeader/AppHeader';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from '../../pages/HomePage'; 
import { LoginPage } from '../../pages/LoginPage';
import {RegisterPage} from '../../pages/RegisterPage';
import { RepairPasswordPage } from '../../pages/RepairPasswordPage'
import { ResetPasswordPage } from '../../pages/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage';
export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader/>
			<main className={styles.main}>
			<Router>
				<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path='/register'>
					<RegisterPage />
				</Route>
				<Route path='/forgot-password'>
					<RepairPasswordPage />
				</Route>
				<Route path='/reset-password'>
					<ResetPasswordPage/>
				</Route>
				<Route path='/profile'>
					<ProfilePage/>
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
				</Switch>
			</Router>
		</main>
	</div>
	)
}

