import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const purchaseInit = (state) => {
    return updateObject(state, {purchased: false})
}

const purchaseBurgerStart = (state) => {
    return updateObject(state, {loading: true})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateObject(state, {loading: false,
                                orders: state.orders.concat(newOrder),
                                purchased: true
                                })
}

const fetchBurgerStart = (state) => {
    return updateObject(state, {loading: true})
}
const purchaseBurgerFailed = (state) => {
    return updateObject(state, {loading: false})
}

const fetchBurgerSuccess = (state, action) => {
    return updateObject(state, {loading: false,
        orders: action.orders
        })
}

const fetchBurgerFail = (state, action) => {
    return updateObject(state, {loading: false,
        error: action.error
        })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)   
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)   
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state)    
        case actionTypes.FETCH_ORDER_START: return fetchBurgerStart(state)
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchBurgerSuccess(state, action)
        case actionTypes.FETCH_ORDER_FAIL: return fetchBurgerFail(state, action)
        default: return state
    }
}

export default reducer;