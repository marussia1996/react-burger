import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './IngredientDetails.module.css'

export const IngredientDetails = () => {
    const {id} = useParams();
    const ingredients = useSelector(store=>store.listIngredients.ingredients);
    const ingredient = ingredients.find((el)=> el._id === id);
    return (
        // TODO: add Loading animation
         (ingredient && 
        <div className={`${styles.container} pb-15`}>
            <img className={`${styles.image} mb-4`} src={ingredient.image} alt={ingredient.name}/>
            <h3 className={`${styles.subtitle} mb-8 text text_type_main-medium`}>{ingredient.name}</h3>
            <ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
                <li className={`${styles.item} mr-5`}>
                    <p className={`${styles.name}`}>Калории,ккал</p>
                    <p className={`${styles.value}`}>{ingredient.calories}</p>
                </li>
                <li className={`${styles.item} mr-5`}>
                    <p className={`${styles.name}`}>Белки, г</p>
                    <p className={`${styles.value}`}>{ingredient.proteins}</p>
                </li>
                <li className={`${styles.item} mr-5`}>
                    <p className={`${styles.name}`}>Жиры, г</p>
                    <p className={`${styles.value}`}>{ingredient.fat}</p>
                </li>
                <li className={`${styles.item}`}>
                    <p className={`${styles.name}`}>Углеводы, г</p>
                    <p className={`${styles.value}`}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
        )
    )
};
