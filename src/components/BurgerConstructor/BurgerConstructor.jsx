import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './BurgerConstructor.module.css'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT} from '../../services/actions/currentIngredients'
import uuid from 'react-uuid';
import image from '../../images/bun.png'

export const BurgerConstructor = ({openModalOrder}) => {
    const ingredients = useSelector(store=>store.currentIngredients.currentIngredients);
    const bun = useSelector(store=>store.currentIngredients.currentBun);
    const dispatch = useDispatch();
    const priceCounting = useCallback(()=>{
        return ( (bun ? bun.price * 2 : 0) +
            ingredients.reduce((acc, topping) =>  acc +  topping.data.price , 0));
        },[ingredients,bun]);
    
    const bunRender = (position) =>{
        let currentType = '';
        if(position === '(низ)'){
            currentType = 'bottom';
        }
        else{
            currentType = 'top';
        }
            if(bun){
                return(
                    <ConstructorElement
                    type={`${currentType}`}
                    isLocked={true}
                    text={`${bun.name} ${position}`}
                    price={bun.price}
                    thumbnail={bun.image}
                    />
                )
            }
            else{
                return(
                    <ConstructorElement
                    type={`${currentType}`}
                    isLocked={true}
                    text='Булка не выбрана, выберите ее из списка'
                    price={0}
                    thumbnail={image}
                    />
                )
            }
    };
    const addBun = (item) => {
        dispatch({type: ADD_BUN, payload: item });
    }
    const addIngredient = (item) =>{
        dispatch({type:ADD_INGREDIENT, payload:item})
    }
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
          }),
        drop(item){
            if(item.ingredient.type === 'bun'){
                addBun(item.ingredient);
            }
            else{
                addIngredient(item.ingredient);
            }
        }
    })
    const deleteIngredient = (uid) =>{
        dispatch({type: DELETE_INGREDIENT, payload: uid});
    }
    return (
      <section className={`${styles.section} ${isHover ? styles.section : ''} pt-25`} ref={dropTarget}>
        <div className='mr-4 ml-4 mb-4 pl-8'>
            {
                bunRender('(верх)')
            } 
        </div>    
        <div className={`${styles.containerScroll} `} >
            <Scrollbars universal
                renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
                    {   useMemo(()=>
                        ingredients.filter((ingredient) => (ingredient.data.type !== 'bun')).map((ingredient) => (
                            <div  className={`${styles.ingredient} pl-4 pr-4 pb-4`} key={uuid()}>
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
                        ))
                        ,[ingredients])
                    } 
                    {
                        ingredients.length === 0 &&
                        <div  className={`${styles.ingredient} pl-4 pr-4 pb-4`}>
                            <p className='text text_type_main-default pl-10'>Выберите ингредиенты</p>
                        </div>
                    }  
            </Scrollbars>
        </div>
        <div className='mr-4 ml-4 mt-4 pl-8'>
            {
                bunRender('(низ)')
            }
        </div>
        <div className={`${styles.wrapperPrice} mt-10 mr-4`}>
            <div className={`${styles.containePrice} mr-10`}>
                <p className='text text_type_digits-medium'>
                    {priceCounting()}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={openModalOrder}>
                Оформить заказ
            </Button>
        </div>
      </section>
    );
  };
BurgerConstructor.propTypes = {
    openModalOrder: PropTypes.func.isRequired,
};

