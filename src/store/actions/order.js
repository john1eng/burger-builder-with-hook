import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}
export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart())
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error))
        });
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderfail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParameter = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('/orders.json' + queryParameter)
            .then(res => {
                const fetchedOrders = []
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
                // this.setState({loading:false, orders: fetchedOrders});
            })
            .catch(err => {
                dispatch(fetchOrderfail(err))
                // this.setState({loading:false});
            });
    }
}