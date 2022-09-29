import styles from './Profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef } from "react"
import { NavLink } from 'react-router-dom';
export const Profile = () =>{
    const [state, setState] = useState({
        name: 'name',
        email: 'email',
        password: 'pass',
    });
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const emailRef = useRef(null);
    const nameClick  = () => {
        setTimeout(() => nameRef.current.focus(), 0)
    }
    const emailClick = () => {
        setTimeout(() => emailRef.current.focus(), 0)
    }
    const passwordClick = () => {
        setTimeout(() => passRef.current.focus(), 0)
    }
    const onChangeInputs = e => {
        const value = e.target.value;
        const name = e.target.name;
        // Применяем вычисляемые имена свойств
        setState({
        ...state,
        [name]: value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className={`${styles.container}`}>
            <nav className={`${styles.navigation}`}>
                <NavLink exact to='/profile' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Профиль</NavLink>
                <NavLink exact to='/profile/orders' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>История заказов</NavLink>
                <NavLink exact to='/profile/orders/:id' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Выход</NavLink>
                <p className={`${styles.caption} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input}`}>
                    <Input
                        placeholder="Имя"
                        name="name"
                        type="text"
                        icon='EditIcon'
                        onChange={onChangeInputs}
                        value={state.name}
                        ref={nameRef}
                        onIconClick={nameClick}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='Логин'
                        name='email'
                        type="email"
                        icon='EditIcon'
                        onChange={onChangeInputs} 
                        value={state.email}
                        ref={emailRef}
                        onIconClick={emailClick}
                        error={false}
                        errorText="Ошибка"
                        size="default" 
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='Пароль'
                        name='password'
                        type="password"
                        icon='EditIcon'
                        onChange={onChangeInputs} 
                        value={state.password}
                        ref={passRef}
                        onIconClick={passwordClick}
                        error={false}
                        errorText="Ошибка"
                        size="default" 
                    />
                </div>
            </form>
        </div>
    )
}