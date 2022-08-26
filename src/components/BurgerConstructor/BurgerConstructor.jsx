import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './BurgerConstructor.module.css'
import { useContext, useEffect, useCallback } from 'react'
import { DataContext } from '../../services/dataContext.js'
import { BunContext } from '../../services/bunContext.js'
import { PriceContext } from '../../services/priceContext.js'

export const BurgerConstructor = ({openModalOrder}) => {
    const {ingreedients} = useContext(DataContext);
    const {bun, setBun} = useContext(BunContext);
    const {priceState, priceDispatcher} = useContext(PriceContext);
    useEffect(() => {
        const currentBun = ingreedients.find((ingreedient) => {return ingreedient.type === 'bun'});
        setBun(currentBun);
  	},[ingreedients,setBun]);
    const priceCounting = useCallback(()=>{
        if(bun.price){
            const price = ingreedients.reduce((acc, topping) => {
                const totalPrice = acc + (topping.type !== "bun" ? topping.price : 0);
                return totalPrice + bun.price*2;
            }, 0)
            priceDispatcher({type: 'counting', payload: price})
        }
    },[ingreedients,bun.price, priceDispatcher]);
    useEffect(()=>{
        priceCounting();
    }, [bun.price, ingreedients, priceCounting, priceState.price])
    
    const bunRender = (position) =>{
        let currentType = '';
        if(position === '(низ)'){
            currentType = 'bottom';
        }
        else{
            currentType = 'top';
        }
        return (
            <ConstructorElement
                type={`${currentType}`}
                isLocked={true}
                text={`${bun.name} ${position}`}
                price={bun.price}
                thumbnail={bun.image}
            />
        )
        
    };
    
    return (
      <section className={`${styles.section} pt-25`}>
        <div className='mr-4 ml-4 mb-4 pl-8'>
            {
                bunRender('(верх)')
            } 
        </div>    
        <div className={`${styles.containerScroll}`}>
            <Scrollbars universal
                renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
            
                    {
                        ingreedients.filter((ingredient) => ingredient.type !== 'bun').map((ingredient) => (
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
                    {`${priceState.price}`}
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

