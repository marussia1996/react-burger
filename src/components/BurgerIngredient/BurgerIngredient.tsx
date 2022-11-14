import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredient.module.css'
import { useDrag } from "react-dnd";
import { FC, useMemo} from "react"
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';
import { useSelector } from '../../services/hooks';
export type TBurgerIngredientProps = {
    ingredient: TIngredient;
    openModalIngredient: (ingredient: TIngredient) => void;
}
export const BurgerIngredient: FC <TBurgerIngredientProps> = ({ingredient, openModalIngredient}) => {
    const ingredients = useSelector(store=>store.currentIngredients.currentIngredients);
    const bun = useSelector(store=>store.currentIngredients.currentBun);
    const [{opacity},dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        }),
    })
    const location = useLocation();
    const setCounter = useMemo(() =>{
        let counter: number = 0;
        if(ingredient.type === 'bun'){
            counter = (bun && ingredient._id === bun._id) ? 2 : 0;
        }
        else if(ingredients.length > 0){
            counter = ingredients.filter((element) => element.data._id === ingredient._id).length;
        }
        return counter;
    }, [bun, ingredients, ingredient._id, ingredient.type]);
    return(
        <Link className={`${styles.link}`}
            to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location }
        }}>
        <div draggable ref={dragRef} style={{opacity}} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
            {setCounter > 0 && <Counter count={setCounter} size="default" />}
            <img src={ingredient.image} alt={ingredient.name}/>
                <div className={`${styles.cost} mt-2 mb-2`}>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className='text text_type_main-default'>
                    {ingredient.name}
                </h3>
            </div>
        </Link>
    );
}