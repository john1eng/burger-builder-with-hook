import React, { useEffect } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {

    const { onFetchOrder } = props;

    useEffect(() => {
        onFetchOrder(props.token, props.userId);
    },[onFetchOrder])

    
        let loading = <Spinner />
        if(!props.loading){
             loading = <div>{props.orders.map(order => (
                <Order 
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price} /> 
             ))}</div>
             }
        return (
            <div>{loading}</div>
        );
     
    }

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));