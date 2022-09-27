import styles from './Login.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
export const Login = () =>{
    const [state, setState] = useState({
        email: "",
        password: '',
      });
    const onChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        // Применяем вычисляемые имена свойств
        setState({
        ...state,
        [name]: value,
        });
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
            <form className={`${styles.form}`}>
                <div className={`${styles.input} mt-6`}>
                    <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={onChange}
                        value={state.email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <PasswordInput type={'password'} onChange={onChange} value={state.password} name={'password'} />
                </div>
                <Button disabled={!(state.email && state.password)} type="primary" size="medium">Войти</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20 mb-4`}>Вы — новый пользователь? <a className={`${styles.link}`}>Зарегистрироваться</a></p>
            <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль? <a className={`${styles.link}`}>Восстановить пароль</a></p>
        </div>
    )
}