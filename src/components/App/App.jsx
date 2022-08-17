import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetailes';
import styles from './App.module.css';
import React from "react"
import { apiLink } from '../../utils/constants';

function App() {
  //состояние для полученных ингредиентов
  const [ingreedients, setIngredients] = React.useState([]);
  //состояния для модальных окон
  const [showIngredientDetails, setShowIngredientDetails] = React.useState(false);
  const [showOrderDetails, setShowOrderDetails] = React.useState(false);
  //состояние для данных ингредиента
  const [infoIngredient, setInfoIngredient] = React.useState({});

  //запрос к Апи
  function getIngredientData(){
    fetch(`${apiLink.url}`)
    .then((res)=>{
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .then((resData) => {
      setIngredients(resData.data)})
    .catch(err => {console.log(err)});     
  }
  //при монтировании запрашиваем данные
  React.useEffect(() => {
    getIngredientData();
  },[]);

  // Закрытие модальных окон
  const closeModals = () => {
    setShowIngredientDetails(false);
    setShowOrderDetails(false);
  };

  // Клик по ингредиенту
  const openModalIngredient = (ingredient) => {
	setInfoIngredient (ingredient)
    setShowIngredientDetails(true);
  }

  // Клик по кнопке Оформить заказ
  const openModalOrder = () => {
	setShowOrderDetails(true)
  }
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients data={ingreedients} openModalIngredient={openModalIngredient}></BurgerIngredients>
        <BurgerConstructor data={ingreedients} openModalOrder={openModalOrder}></BurgerConstructor>
      </main>
		{showOrderDetails && (
            <Modal handleClose={closeModals} title="Детали заказа">
                <OrderDetails />
            </Modal>
        )}
		{showIngredientDetails && (
            <Modal title="Детали ингредиентов" handleClose={closeModals}>
                <IngredientDetails ingredient={infoIngredient} />
            </Modal>
        )}
    </div>
	
  );
}

export default App;
