import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import './App.css';

function App() {
  return (
    <div className='App'>
      <AppHeader/>
      <main style={{ display:'flex', flexDirection:'row', justifyContent:'center', columnGap: 40}}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
