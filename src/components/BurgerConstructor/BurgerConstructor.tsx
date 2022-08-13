import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {data} from '../../utils/data.js'

import { Scrollbars } from 'react-custom-scrollbars'

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor() {
    return (
      <section style={{ display: 'flex', flexDirection: 'column' }} className='mb-10 pt-25'>
            <div className='mr-4 ml-4 mb-4 pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>
            <div style={{ flex: "1 1 auto" }}>

            
            <Scrollbars universal
                style={{minHeight:'100%'}}
                renderTrackVertical={({style, ...props}) =>
                    <div {...props} style={{...style, cursor: 'pointer', backgroundColor: '#2F2F37', right: '2px', bottom: '2px', top: '2px', borderRadius: '1px', width: '8px'}}/>
                }
                renderThumbVertical={({style, ...props}) =>
                    <div {...props} style={{...style, width: '8px', borderRadius: '3px', backgroundColor: '#8585AD'}}/>
                }
                renderView={({style, ...props}) =>
                    <div {...props} style={{...style, marginRight:'-17px', marginBottom: '17px'}}/>
                }
                >
                    {
                        data.filter((ingredient) => ingredient.type !== 'bun').map((ingredient) => (
                            <div  className=' pl-4 pr-4 pb-4' key={ingredient._id} style={{ display: 'flex', flexDirection: 'row', columnGap:'9.5px' }}>
                                <div style={{alignSelf:'center'}}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                text={ingredient.name}
                                price={50}
                                thumbnail={ingredient.image}
                                />
                            </div>
                        ))
                    }   
            </Scrollbars>
            </div>
            <div className='mr-4 ml-4 pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>

            <div style={{display:'flex', flexDirection:"row", justifyContent:'end'}} className={'mt-10 mr-4'}>
                <div className={'mr-10'} style={{display:'flex', flexDirection:"row", justifyContent:'center', alignItems:'center', columnGap:"9.5px"}}>
                    <p className={'text text_type_digits-medium'}>
                        {data.reduce((acc, topping) => {
                        const totalPrice =
                            acc + (topping.type !== "bun" ? topping.price : 0);
                        return totalPrice;
                        }, 0)}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
            </div>
      </section>
    );
  }
  
  export default BurgerConstructor;