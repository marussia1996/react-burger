import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useMemo} from "react"
import { Scrollbars } from 'react-custom-scrollbars'
import { useInView } from "react-intersection-observer";
import styles from './BurgerIngredients.module.css'
import {SET_CURRENT_TAB} from '../../services/actions/listIngredients'
import { BurgerIngredient } from '../BurgerIngredient/BurgerIngredient'
import { useDispatch, useSelector } from '../../services/hooks';
import { FC } from 'react';
import { TIngredient } from '../../services/types/data';
export type TBurgerIngredientsProps = {
    openModalIngredient: ((ingredient: TIngredient) => void);
}
export const BurgerIngredients:FC<TBurgerIngredientsProps> = ({openModalIngredient}) => {
    const ingredients = useSelector(store=>store.listIngredients.ingredients);
    const currentTab = useSelector(store=>store.listIngredients.currentTab);
    const dispatch = useDispatch();
    const [ bun, inViewBun ] = useInView({
        threshold: 0.5
      });
      const [sauce, inViewSauce ] = useInView({
        threshold: 0.8
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
    const tabClick = (value: string) => {
        const element = document.querySelector(`.${value}`) as HTMLDivElement;
        element.scrollIntoView({ behavior: "smooth"});
    }

    return(
        <section className={`${styles.section}`}> 
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style = {{display: 'flex'}} className='mb-10'>
                <Tab value="bun" active={currentTab === 'bun'} onClick={(value: string)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={(value)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={(value)=>{dispatch({type: SET_CURRENT_TAB, currentTab: value}); tabClick(value)}}>
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
                                    <BurgerIngredient key={ingredient._id} ingredient={ingredient} openModalIngredient={openModalIngredient}/>
                                ))
                                ,[ingredients, openModalIngredient])
                            }
                        </div>  
                    </div>
                    <div ref={main} className={`${styles.containerTopping} main`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Начинки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   useMemo(()=>
                                ingredients.filter((ingredient) => ingredient.type === 'main').map((ingredient) => (
                                    <BurgerIngredient key={ingredient._id} ingredient={ingredient} openModalIngredient={openModalIngredient}/>
                                ))
                                ,[ingredients, openModalIngredient])
                            }
                        </div>  
                    </div>
                </Scrollbars> 
            </div>
        </section>
    );
}