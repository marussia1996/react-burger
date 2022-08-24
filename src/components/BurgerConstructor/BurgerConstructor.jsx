import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import dataType from '../../utils/types.js'
import styles from './BurgerConstructor.module.css'

export const BurgerConstructor = ({data, openModalOrder}) => {
    return (
      <section className={`${styles.section} pt-25`}>
        <div className='mr-4 ml-4 mb-4 pl-8'>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${data[0].name} (верх)`}
                price={data[0].price}
                thumbnail={data[0].image}
            />
        </div>    
        <div className={`${styles.containerScroll}`}>
            <Scrollbars universal
                renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
            
                    {
                        data.filter((ingredient) => ingredient.type !== 'bun').map((ingredient) => (
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
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${data[0].name} (низ)`}
                price={data[0].price}
                thumbnail={data[0].image}
                />
        </div>
        <div className={`${styles.wrapperPrice} mt-10 mr-4`}>
            <div className={`${styles.containePrice} mr-10`}>
                <p className='text text_type_digits-medium'>
                    {
                        data.reduce((acc, topping) => {
                            const totalPrice = acc + (topping.type !== "bun" ? topping.price : 0);
                            return totalPrice;
                        }, 0)
                    }
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
    data: PropTypes.arrayOf(dataType.isRequired).isRequired,
    openModalOrder: PropTypes.func.isRequired,
};

