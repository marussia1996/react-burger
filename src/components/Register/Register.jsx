import styles from './Register.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
import {Link, Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/actions/user';
import { useSelector } from 'react-redux';
export const Register = () =>{
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
      });
    const user = useSelector(store=>store.user.user);
    const dispatch = useDispatch();
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
        dispatch(registerUser(state.email, state.password, state.name));
    }
    console.log(user);
    if(user){
        return (
            <Redirect to={'/'} />
        );
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input} mt-6`}>
                    <Input
                        placeholder="Имя"
                        name="name"
                        type="text"
                        onChange={onChangeInputs}
                        value={state.name}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={onChangeInputs}
                        value={state.email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <PasswordInput type={'password'} onChange={onChangeInputs} value={state.password} name={'password'} />
                </div>
                <Button disabled={!(state.email && state.password)} type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрированы? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}