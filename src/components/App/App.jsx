import {AppHeader} from '../AppHeader/AppHeader';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from '../../pages/HomePage'; 
import { LoginPage } from '../../pages/LoginPage';
import {RegisterPage} from '../../pages/RegisterPage';

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
				<Route path="/">
					<HomePage />
				</Route>
				</Switch>
			</Router>
		</main>
	</div>
	)
}

