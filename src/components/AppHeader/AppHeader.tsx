import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


function AppHeader() {
    return (
      <nav style={{ background: '#1c1c21' }} className='m-10'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'center' }} className='pt-4 pb-4'>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',gap: '8px'}} className='pl-5 pr-5 pt-4 pb-4 mr-2'>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',gap: '8px'}} className='pl-5 pr-5 pt-4 pb-4'>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
            </div>
            <div style={{margin: '6px 280px 0 112px'}}>
                <Logo/>
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',gap: '8px'}} className='pl-5 pr-5 pt-4 pb-4'>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </div>
        </div>
      </nav>
    );
  }
  
  export default AppHeader;