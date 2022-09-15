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
import {addBun, ADD_BUN, ADD_INGREDIENT} from '../../services/actions/currentIngredients'
export const BurgerConstructor = ({openModalOrder}) => {
    const ingredients = useSelector(store=>store.currentIngredients.currentIngredients);
    const bun = useSelector(store=>store.currentIngredients.currentBun);
    const dispatch = useDispatch();
    const priceCounting = useCallback(()=>{
        console.log(bun);
        return ( (bun ? bun.price * 2 : 0) +
            ingredients.reduce((acc, topping) =>  acc +  topping.price , 0));
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
                    text='булка не выбрана'
                    price={0}
                    thumbnail=''
                    />
                )
            }
    };
    const addBun = (item) => {
        dispatch({type: ADD_BUN, payload:item });
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
        }
    })
    return (
      <section className={`${styles.section} pt-25`} ref={dropTarget}>
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
                        ingredients.filter((ingredient) => (ingredient.type !== 'bun')).map((ingredient) => (
                            <div  className={`${styles.ingredient} pl-4 pr-4 pb-4`} key={ingredient._id}>
                                <div className={`${styles.icon}`}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                />
                            </div>
                        ))
                        ,[ingredients])
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

