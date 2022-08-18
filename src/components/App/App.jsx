import AppHeader from '../AppHeader/AppHeader';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import {OrderDetails} from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import React, {useState, useEffect} from "react"
import { apiLink } from '../../utils/constants';

export const App = () => {
  //состояние для полученных ингредиентов
  const [ingreedients, setIngredients] = useState([]);
  const [ingredientsError, setIngredientsError] = useState('');
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
      setIngredientsError(err)
    });     
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
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients data={ingreedients} openModalIngredient={openModalIngredient}></BurgerIngredients>
        { (ingreedients.length && !ingredientsError) &&
          <BurgerConstructor data={ingreedients} openModalOrder={openModalOrder}></BurgerConstructor>
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

