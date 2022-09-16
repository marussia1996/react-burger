import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ConstructorIngredient.module.css'
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import dataType from '../../utils/types'
import {DELETE_INGREDIENT} from '../../services/actions/currentIngredients'
import { useSelector, useDispatch } from 'react-redux';

export const ConstructorIngredient = ({ingredient, uid}) =>{
    const dispatch = useDispatch();
    const deleteIngredient = (uid) =>{
        dispatch({type: DELETE_INGREDIENT, payload: uid});
    }
    return (
        <div  className={`${styles.ingredient} pl-4 pr-4 pb-4`}>
            <div className={`${styles.icon}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>{deleteIngredient(uid)}}
            />
        </div>
    );
}
ConstructorIngredient.propTypes = {
    ingredient: dataType.isRequired,
    uid:PropTypes.string,
};