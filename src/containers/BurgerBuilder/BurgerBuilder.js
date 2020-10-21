import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../../store/action'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-d179f.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }
    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        return sum > 0;
    }
 
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner />

        if ( this.props.ings ){
            burger = 
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        />
                </Aux>
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
            if (this.state.loading){
                orderSummary = <Spinner />
            }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (type) => dispatch({ type: actionType.ADD_INGREDIENT, ingType:type}),
        onIngredientRemove: (type) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingType:type})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));