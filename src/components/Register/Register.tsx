import styles from './Register.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, FormEvent } from "react"
import {Link, Redirect} from 'react-router-dom';
import { registerUser } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks/useDispatch&Selector';
import { useForm } from '../../services/hooks/useForm';

export const Register: FC = () =>{
    const {values, handleChange} = useForm({
        name: '',
        email: "",
        password: '',
    });
    const user = useSelector(store=>store.user.user);
    const dispatch = useDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(values.email, values.password, values.name));
    }
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
                        onChange={handleChange}
                        value={values.name}
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
                        onChange={handleChange}
                        value={values.email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <PasswordInput onChange={handleChange} value={values.password} name={'password'} />
                </div>
                <Button htmlType='submit' disabled={!(values.email && values.password)} type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрированы? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}