import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor';
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from 'react';
import { useSelector } from '../services/hooks/useDispatch&Selector';
import { TIngredient } from '../services/types/data';
type THomePageProps = {
	openModalIngredient: (ingredient:TIngredient)=>void;
	openModalOrder: ()=>void;
}
export const HomePage: FC<THomePageProps> = ({openModalIngredient,openModalOrder}) => {
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