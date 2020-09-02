import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type= {igKey} />;
            });
        })
        //this is to flatten the array to prevent some ingredients from zero
        .reduce((arr, el) => {
            console.log("...", arr, "...")
            return arr.concat(el) // el is the element
        }, [])
        
        console.log(transformedIngredients)
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />



        </div>
    );
};

export default burger;