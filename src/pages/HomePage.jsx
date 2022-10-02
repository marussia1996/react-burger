import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage({openModalIngredient,openModalOrder}) {
    //значения из хранилища 
	const ingredientsRequest = useSelector(store=>store.listIngredients.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.listIngredients.ingredientsFailed);
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
        </>
  	);
}