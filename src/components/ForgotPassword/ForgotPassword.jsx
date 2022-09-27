import styles from './ForgotPassword.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
export const ForgotPassword = () =>{
    const [email, setEmail] = useState('');
    const onChange = e =>{
        setEmail(e.target.value);
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${styles.form}`}>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <Input
                        placeholder="Укажите e-mail"
                        name="email"
                        type="email"
                        onChange={onChange}
                        value={email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <Button disabled={!(email)} type="primary" size="medium">Восстановить</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <a className={`${styles.link}`}>Войти</a></p>
        </div>
    )
}