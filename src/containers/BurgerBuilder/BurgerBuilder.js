import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'


const burgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch();

    const onIngredientAdd = (type) => dispatch(actions.add_ingredient(type));
    const onIngredientRemove = (type) => dispatch(actions.remove_ingredient(type))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[])
    const onInitPurchased = () => dispatch(actions.initPurchase())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    const ings = useSelector(state => state.burgerBuilder.ingredients)       
    const price = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuthenticated = useSelector(state => state.auth.token !== null)
    
    useEffect (() => {
        onInitIngredients();
    },[onInitIngredients])

    const updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        return sum > 0;
    }
 
    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true);
        }
        else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }
    
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchased()
        props.history.push({pathname: '/checkout'});
    }

        const disabledInfo = {
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded </p> : <Spinner />

        if ( ings ){
            burger = 
                <Aux>
                    <Burger ingredients={ings}/>
                    <BuildControls 
                        ingredientAdded={onIngredientAdd}
                        ingredientRemoved={onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={updatePurchasable(ings)}
                        ordered={purchaseHandler}
                        price={price}
                        isAuthenticated={isAuthenticated}
                        />
                </Aux>
            orderSummary = <OrderSummary 
                ingredients={ings}
                price={price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>
        }
            // if (this.state.loading){
            //     orderSummary = <Spinner />
            // }

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }


// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdd: (type) => dispatch(actions.add_ingredient(type)),
//         onIngredientRemove: (type) => dispatch(actions.remove_ingredient(type)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchased: () => dispatch(actions.initPurchase()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }


export default withErrorHandler(burgerBuilder, axios);