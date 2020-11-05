import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

import PropTypes from 'prop-types';

const orderSummary = props => {

        const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
            <li key = {igKey}>
                <span style ={{textTransform: 'capitalize'}}> {igKey}</span>: {props.ingredients[igKey]}
            </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious buger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )  
    
}

orderSummary.propTypes = {
    price: PropTypes.number,
    purchaseCanceled: PropTypes.func,
    purchaseContinued: PropTypes.func
}

export default orderSummary;