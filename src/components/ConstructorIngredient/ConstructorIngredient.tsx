import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ConstructorIngredient.module.css'
import PropTypes from "prop-types";
import {dataType} from '../../utils/types'
import {DELETE_INGREDIENT, SWAP_INGREDIENT} from '../../services/actions/currentIngredients'
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {FC, useRef} from 'react'
import { TConstructorIngredient, TIngredient } from '../../services/types/data';

type TConstructorIngredientProps = {
    ingredient: TConstructorIngredient;
    index: number;
}
export const ConstructorIngredient: FC<TConstructorIngredientProps> = ({ingredient, index}) =>{
    const dispatch = useDispatch();
    const [{opacity}, dragRef] = useDrag({
        type: 'selectedIngredient',
        item: {ingredient, index},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        }),
        
    });
    const [{isSwap}, dropRef] = useDrop<TConstructorIngredientProps, void, {isSwap: boolean}> ({
        accept: 'selectedIngredient',
        collect: monitor => ({
            isSwap: monitor.isOver()
          }),
          hover: (item, monitor) => {

            const dragIndex = item.index;
            const hoverIndex = index;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (hoverBoundingRect !== undefined && clientOffset !== null) {
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const hoverActualY = clientOffset.y - hoverBoundingRect.top

                // наведение при перетаскивании вниз ниже середины по оси y
                if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
                // наведение при перетаскивании вверх выше середины по оси y
                if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            }
            swapIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })
    const ref = useRef<HTMLDivElement | null>(null);
    const swapIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch({type: SWAP_INGREDIENT, dragIndex, hoverIndex});
    }
    const deleteIngredient = (uid: string) =>{
        dispatch({type: DELETE_INGREDIENT, uid: uid});
    }
    return (
        <div draggable ref={(ref)=>{dragRef(dropRef(ref))}} style={{opacity}} className={`${styles.ingredient} ${isSwap ? styles.onSwap : ''} pl-4 pr-4 pb-4`}>
            <div className={`${styles.icon}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
            text={ingredient.data.name}
            price={ingredient.data.price}
            thumbnail={ingredient.data.image}
            handleClose={()=>{deleteIngredient(ingredient.uid)}}
            />
        </div>
    );
}
// ConstructorIngredient.propTypes = {
//     ingredient: dataType.isRequired,
//     index: PropTypes.number,
// };