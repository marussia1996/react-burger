import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
export const AppHeader = () => {
    return (
    <header className={`${styles.header} pb-4 pt-4`}>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <li className={`${styles.item} pl-5 pr-5`}>
                        <a href='./' className={`${styles.link} text text_type_main-default`}>
                            <BurgerIcon type="primary" />
                            <p className="pl-2">Конструктор </p>
                        </a>
                    </li>
                    <li className={`${styles.item} pl-5 pr-5 ml-2`}>
                        <a href='./'className={`${styles.link} `}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive pl-2 ">Лента заказов</p>
                        </a>
                    </li>
                </ul>
                <Logo/>
            </div>
            <div className='pl-5 pr-5'>
                <a href='./' className={`${styles.link} `}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2 ">Личный кабинет</p>
                </a>
            </div>
        </nav>
    </header>
    );
}