import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './BurgerIngredient.module.css'
import { useDrag } from "react-dnd";
import dataType from '../../utils/types'
import { useMemo} from "react"
import { useSelector } from 'react-redux';

export const BurgerIngredient = ({ingredient, openModalIngredient}) => {
    const ingredients = useSelector(store=>store.currentIngredients.currentIngredients);
    const bun = useSelector(store=>store.currentIngredients.currentBun);
    const [{isDrag},dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })
    const setCounter = useMemo(() =>{
        if(ingredient.type === 'bun'){
            return bun && ingredient._id === bun._id ? 2 : 0;
        }
        else{
            return ingredients.length > 0 && ingredients.filter((element) => element.data._id === ingredient._id).length;
        }
    }, [bun, ingredients, ingredient._id, ingredient.type]);
    return(
        <div draggable ref={dragRef} style={{isDrag}} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
            {setCounter > 0 && <Counter count={setCounter} size="default" />}
            <img src={ingredient.image} alt={ingredient.name}/>
                <div className='mt-2 mb-2'>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className='text text_type_main-default'>
                    {ingredient.name}
                </h3>
            </div>
    );
}
BurgerIngredient.propTypes = {
    ingredient: dataType.isRequired,
    openModalIngredient: PropTypes.func.isRequired,
};