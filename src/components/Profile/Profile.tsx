import styles from './Profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useEffect, FormEvent, SyntheticEvent } from "react"
import { updateUser, getUser } from '../../services/actions/user';
import { NavProfile } from '../NavProfile/NavProfile';
import { useDispatch, useSelector } from '../../services/hooks/useDispatch&Selector';
import { useForm } from '../../services/hooks/useForm';

export const Profile = () =>{
    const user = useSelector(store=>store.user.user);
    const updateFailed = useSelector(store=>store.user.updateFailed);
	const expiredToken = useSelector(store=>store.user.expiredToken);
    const dispatch = useDispatch();
    const {values, handleChange, setValues} = useForm({
        name: '',
        email: "",
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
			dispatch(updateUser(values.name,values.email,values.password));
		}
	},[dispatch, expiredToken, updateFailed, values.name,values.email,values.password])
    //при монтировании заполняем данные, если они есть
    useEffect(()=>{
        if(user){
            setValues({
                name: user.name,
                email: user.email,
                password: '',
            })
        }
    },[setValues, user])
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
    //отправка формы
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(values.name,values.email,values.password));
    }
    //сброс формы
    const handleReset = (e: SyntheticEvent<Element, Event>) =>{
        e.preventDefault();
        user && setValues({
            ...values,
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
                        onChange={handleChange}
                        value={values.name}
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
                        onChange={handleChange} 
                        value={values.email}
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
                        onChange={handleChange} 
                        value={values.password}
                        ref={passRef}
                        onIconClick={passwordClick}
                        error={false}
                        errorText="Ошибка"
                        size="default" 
                    />
                </div>
                <div className={`${styles.buttons}`}>
                    <Button htmlType='reset' type="secondary" size="medium" onClick={handleReset}>Отмена</Button>
                    <Button htmlType='submit' disabled={!(values.name && values.email && values.password)} type="primary" size="medium" >Сохранить</Button>
                </div>
            </form>
        </div>
    )
}