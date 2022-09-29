import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom';
import styles from './AppHeader.module.css'
export const AppHeader = () => {
    const location = useLocation();
    return (
    <header className={`${styles.header} pb-4 pt-4`}>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <li className={`${styles.item} pl-5 pr-5`}>
                        <NavLink exact to='/' className={`${styles.link}`} activeClassName={`${styles.activeLink}`}>
                            <BurgerIcon type={location.pathname === '/' ? "primary"  : "secondary" }/>
                            <p className="text text_type_main-default pl-2">Конструктор </p>
                        </NavLink>
                    </li>
                    <li className={`${styles.item} pl-5 pr-5 ml-2`}>
                        <NavLink exact to='/order' className={`${styles.link}`} activeClassName={`${styles.activeLink}`}>
                            <ListIcon type={location.pathname === '/order' ? "primary"  : "secondary" } />
                            <p className="text text_type_main-default pl-2 ">Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
                <Logo/>
            </div>
            <div className='pl-5 pr-5'>
                <NavLink exact to='/profile' className={`${styles.link}`} activeClassName={`${styles.activeLink}`}>
                    <ProfileIcon type={location.pathname === '/profile' ? "primary"  : "secondary" } />
                    <p className="text text_type_main-default pl-2 ">Личный кабинет</p>
                </NavLink>
            </div>
        </nav>
    </header>
    );
}