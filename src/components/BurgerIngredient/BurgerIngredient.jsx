import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './BurgerIngredient.module.css'
import { useDrag } from "react-dnd";
import dataType from '../../utils/types'

export const BurgerIngredient = ({ingredient, openModalIngredient}) => {

    const [{isDrag},dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient},
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })
    console.log(`isDrag ${isDrag}`);
    return(
        <div draggable ref={dragRef} style={{isDrag}} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
            <Counter count={1} size="default" />
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