import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './BurgerIngredients.module.css'
import {data} from '../../utils/data.js'


function BurgerIngredients(){
    const [current, setCurrent] = React.useState('bun');
   return(
    <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div style={{ display: 'flex' }} className="mb-10">
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
        <Scrollbars
            renderTrackVertical={({style, ...props}) =>
                <div {...props} style={{...style, cursor: 'pointer', backgroundColor: '#2F2F37', right: '2px', bottom: '2px', top: '2px', borderRadius: '1px', width: '8px'}}/>
            }
            renderThumbVertical={({style, ...props}) =>
                <div {...props} style={{...style, width: '8px', borderRadius: '3px', backgroundColor: '#8585AD'}}/>
            }>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <div className='mt-6 ml-4 mr-4 mb-10' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24, alignItems: "center", justifyContent: 'center' }}>
                    {
                        data.filter((ingredient) => ingredient.type === 'bun').map((ingredient) => (
                            <div  key={ingredient._id} style={{position: 'relative'}}>
                                <Counter count={1} size="default" />
                                <img src={ingredient.image} alt=''/>
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
    </section>
   );
}
 
export default BurgerIngredients;