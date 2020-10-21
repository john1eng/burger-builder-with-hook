import * as actionType from '../../store/action'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: {"bacon":0,"cheese":0,"meat":0,"salad":0},
    totalPrice: 4,
    purchasable: false
}




const reducer = (state = initialState, action) => {
   
    function updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                console.log('sum: ', sum)
                return sum + el;
            },0);
            
        return{
            ...state,
            purchasable: sum > 0
        }
        
    }

    switch(action.type){
        case actionType.ADD_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingType]: state.ingredients[action.ingType] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
        }
        // this.updatePurchaseState(updatedIngredients);
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
            }
            default: return state;
    }

}

export default reducer;