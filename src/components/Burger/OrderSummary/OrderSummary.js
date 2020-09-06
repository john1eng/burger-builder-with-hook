import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

import PropTypes from 'prop-types';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary] DidUpdate')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li key = {igKey}>
                <span style ={{textTransform: 'capitalize'}}> {igKey}</span>: {this.props.ingredients[igKey]}
            </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious buger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }

    
    
}

OrderSummary.propTypes = {
    price: PropTypes.number,
    purchaseCanceled: PropTypes.func,
    purchaseContinued: PropTypes.func
}

export default OrderSummary;