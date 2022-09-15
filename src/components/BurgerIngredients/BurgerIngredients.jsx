import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useMemo} from "react"
import { Scrollbars } from 'react-custom-scrollbars'
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import styles from './BurgerIngredients.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {SET_CURRENT_TAB} from '../../services/actions/listIngredients'
import { useDrag } from "react-dnd";
import { BurgerIngredient } from '../BurgerIngredient/BurgerIngredient'

export const BurgerIngredients = ({openModalIngredient}) => {
    const ingredients = useSelector(store=>store.listIngredients.ingredients);
    const currentTab = useSelector(store=>store.listIngredients.currentTab);
    const dispatch = useDispatch();
    const [ bun, inViewBun ] = useInView({
        threshold: 0.5
      });
      const [sauce, inViewSauce ] = useInView({
        threshold: 0.3
      });
      const [ main, inViewMain ] = useInView({
        threshold: 0.2
      });
    
    useEffect(()=>{
        if(inViewBun){
            dispatch({type: SET_CURRENT_TAB, currentTab: 'bun'});
        }
        else if(inViewSauce){
            dispatch({type: SET_CURRENT_TAB, currentTab: 'sauce'});
        }
        else if(inViewMain){
            dispatch({type: SET_CURRENT_TAB, currentTab: 'main'});
        }
    }, [inViewBun,inViewSauce,inViewMain, dispatch]);
    const tabClick = (value) => {
        document.querySelector(`.${value}`).scrollIntoView({ behavior: "smooth"});
    }
    const [{isDrag},dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredients},
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })
    return(
        <section className={`${styles.section}`}> 
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style = {{display: 'flex'}} className='mb-10'>
                <Tab value="bun" active={currentTab === 'bun'} inViewBun={inViewBun} onClick={(value)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} inViewSauce={inViewSauce} onClick={(value)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} inViewMain={inViewMain} onClick={(value)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                     renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                     renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
                    <div ref={bun} className={`${styles.containerTopping} bun`}>
                        <h2  className={`${styles.title} text text_type_main-medium mb-6`}>Булки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   useMemo(()=>
                                ingredients.filter((ingredient) => ingredient.type === 'bun').map((ingredient) => (
                                    <BurgerIngredient key={ingredient._id} ingredient={ingredient} openModalIngredient={openModalIngredient}/>
                                ))
                                ,[ingredients, openModalIngredient])
                            }
                        </div>  
                    </div>
                    <div ref={sauce} className={`${styles.containerTopping} sauce`}>
                        <h2  className={`${styles.title} text text_type_main-medium mb-6`}>Соусы</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   useMemo(()=>
                                ingredients.filter((ingredient) => ingredient.type === 'sauce').map((ingredient) => (
                                    <div draggable ref={dragRef} style={{isDrag}} key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
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
                                ))
                                ,[ingredients, openModalIngredient, dragRef, isDrag])
                            }
                        </div>  
                    </div>
                    <div ref={main} className={`${styles.containerTopping} main`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Начинки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   useMemo(()=>
                                ingredients.filter((ingredient) => ingredient.type === 'main').map((ingredient) => (
                                    <div draggable ref={dragRef} style={{isDrag}} key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
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
                                ))
                                ,[ingredients, openModalIngredient, dragRef, isDrag])
                            }
                        </div>  
                    </div>
                </Scrollbars> 
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
    openModalIngredient: PropTypes.func.isRequired,
};