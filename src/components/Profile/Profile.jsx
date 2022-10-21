import styles from './Profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef, useEffect } from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser, getUser } from '../../services/actions/user';
import { NavProfile } from '../NavProfile/NavProfile';
import { wsConnectionClosedUserOrders, wsConnectionOpenUserOrders } from '../../services/actions/wsUserOrders';

export const Profile = () =>{
    const user = useSelector(store=>store.user.user);
    const updateFailed = useSelector(store=>store.user.updateFailed);
	const expiredToken = useSelector(store=>store.user.expiredToken);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
    });
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const emailRef = useRef(null);
    //при монтировании получаем данные пользователя
    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
		if(updateFailed && !expiredToken){
			dispatch(updateUser(state.name,state.email,state.password));
		}
	},[dispatch, expiredToken, updateFailed, state.name,state.email,state.password])
    //функии взаимодействия с inputs
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
    //отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(state.name,state.email,state.password));
    }
    //сброс формы
    const handleReset = (e) =>{
        e.preventDefault();
        setState({
            ...state,
            name: user.name,
            email: user.email,
            password: ''
        })
    }
    
    return (
        <div className={`${styles.container}`}>
            <NavProfile/>
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
                <div className={`${styles.buttons}`}>
                    <Button type="secondary" size="medium" onClick={handleReset}>Отмена</Button>
                    <Button disabled={!(state.name && state.email && state.password)} type="primary" size="medium" >Сохранить</Button>
                </div>
            </form>
        </div>
    )
}