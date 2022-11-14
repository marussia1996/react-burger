import styles from './Profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef, useEffect, ChangeEvent, FormEvent, SyntheticEvent } from "react"
import { updateUser, getUser } from '../../services/actions/user';
import { NavProfile } from '../NavProfile/NavProfile';
import { useDispatch, useSelector } from '../../services/hooks';

export const Profile = () =>{
    const user = useSelector(store=>store.user.user);
    const updateFailed = useSelector(store=>store.user.updateFailed);
	const expiredToken = useSelector(store=>store.user.expiredToken);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    //при монтировании получаем данные пользователя
    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
		if(updateFailed && !expiredToken){
			dispatch(updateUser(state.name,state.email,state.password));
		}
	},[dispatch, expiredToken, updateFailed, state.name,state.email,state.password])
    //при монтировании заполняем данные, если они есть
    useEffect(()=>{
        if(user){
            setState({
                name: user.name,
                email: user.email,
                password: '',
            })
        }
    },[setState, user])
    //функии взаимодействия с inputs
    const nameClick  = () => {
        setTimeout(() => nameRef.current?.focus(), 0)
    }
    const emailClick = () => {
        setTimeout(() => emailRef.current?.focus(), 0)
    }
    const passwordClick = () => {
        setTimeout(() => passRef.current?.focus(), 0)
    }
    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        // Применяем вычисляемые имена свойств
        setState({
        ...state,
        [name]: value,
        });
    }
    //отправка формы
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(state.name,state.email,state.password));
    }
    //сброс формы
    const handleReset = (e: SyntheticEvent<Element, Event>) =>{
        e.preventDefault();
        user && setState({
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
                    <Button htmlType='reset' type="secondary" size="medium" onClick={handleReset}>Отмена</Button>
                    <Button htmlType='submit' disabled={!(state.name && state.email && state.password)} type="primary" size="medium" >Сохранить</Button>
                </div>
            </form>
        </div>
    )
}