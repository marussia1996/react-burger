import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState} from "react"
import { Scrollbars } from 'react-custom-scrollbars'
import PropTypes from "prop-types";
import dataType from '../../utils/types.js'
import styles from './BurgerIngredients.module.css'

export const BurgerIngredients = ({data, openModalIngredient}) => {
    const [current, setCurrent] = useState('bun');
    return(
        <section className={`${styles.section}`}> 
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style = {{display: 'flex'}} className='mb-10'>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                     renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                     renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
                    <div className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Булки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {
                                data.filter((ingredient) => ingredient.type === 'bun').map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
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
                            }
                        </div>  
                    </div>
                    <div className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Соусы</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {
                                data.filter((ingredient) => ingredient.type === 'sauce').map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
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
                            }
                        </div>  
                    </div>
                    <div className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Начинки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {
                                data.filter((ingredient) => ingredient.type === 'main').map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
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
                            }
                        </div>  
                    </div>
                </Scrollbars> 
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataType.isRequired).isRequired,
    openModalIngredient: PropTypes.func.isRequired,
};