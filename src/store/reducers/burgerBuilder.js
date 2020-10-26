import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../store/utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingType]: state.ingredients[action.ingType] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState =    {ingredients:updatedIngredients,
                            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
                            }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIngs = {[action.ingType]: state.ingredients[action.ingType] - 1}
    const updatedIng = updateObject(state.ingredients, updatedIngs)
    const updatedSt =    {ingredients:updatedIng,
                            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
                            }
    return updateObject(state, updatedSt)
}

const setIngredients = (state, action) => {
    return updateObject(state, {ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false}) 
}

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, { error: true })
}

const burgerBuilder = (state = initialState, action) => {

    switch(action.type){
        case actionType.ADD_INGREDIENT: return addIngredient(state, action)
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action)    
        case actionType.SET_INGREDIENTS: return setIngredients(state, action)   
        case actionType.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action)
        default: return state;
    }
}

export default burgerBuilder;