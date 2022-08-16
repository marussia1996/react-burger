import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import './App.css';
import React from "react"
import { apiLink } from '../../utils/constants';
//import {data} from '../../utils/data.js'
function App() {
  const [data, setData] = React.useState({ 
    ingredientData: [],
    message: false,
    loading: true
  });
  React.useEffect(() => {
    const getIngredientData = async () => {
      setData({...data, loading: true});
      fetch(`${apiLink}`)
      .then(async res =>{
        const dataIng = await res.json();
        if(!res.ok){
          const error = (dataIng && dataIng.message) || res.statusText;
                return Promise.reject(error);
        }
        setData({ ingredientData: dataIng, loading: false });
      })
      .catch(error => {
        setData({ ...data, message: true });
        console.error('There was an error!', error);
      });
    }

    getIngredientData();
  },[]);

  return (
    <div className='App'>
      <AppHeader/>
      <main style={{ display:'flex', flexDirection:'row', justifyContent:'center', columnGap: 40, minHeight: 'calc(100vh - 132px)'}}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
