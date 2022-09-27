import styles from './ResetPassword.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
export const ResetPassword = () =>{
    const [state, setState] = useState({
        password: '',
        code: ''
      });
    const onChangeInputs = e => {
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
            <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${styles.form}`}>
                <div className={`${styles.input} mt-6`}>
                    <PasswordInput  placeholder="Введите новый пароль" type={'password'} onChange={onChangeInputs} value={state.password} name={'password'} />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <Input
                        placeholder="Введите код из письма"
                        name="code"
                        type="text"
                        onChange={onChangeInputs}
                        value={state.code}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <Button disabled={!(state.code && state.password)} type="primary" size="medium">Сохранить</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <a className={`${styles.link}`}>Войти</a></p>
        </div>
    )
}