import * as actionType from './actionTypes';
import axios from '../../axios-order'

const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFail = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return dispatch=>{
        axios.get('https://react-my-burger-d179f.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFail())
        })
    }
}


export const add_ingredient = (type) => {
    return{
    type: actionType.ADD_INGREDIENT,
    ingType: type
    }
}

export const remove_ingredient = (type) => {
    return{
    type: actionType.REMOVE_INGREDIENT,
    ingType: type
    }
}