import { FC } from "react";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import styles from './IngredientPage.module.css'
export const IngredientPage:FC = () => {
    return (
        <div className='pt-30'>
            <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
            <IngredientDetails/>
        </div>
        
    )
}