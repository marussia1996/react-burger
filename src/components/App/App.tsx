import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main style={{margin: '0 380px', display:'flex', flexDirection:'row', justifyContent:'center', maxWidth:'600px'}}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
