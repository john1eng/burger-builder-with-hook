import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from '../src/store/actions/index'
import asyncComponent from './hoc/asyncComponenet/asyncComponent'

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout')
})

const asyncOrder = asyncComponent(()=> {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(()=> {
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount(){
    this.props.ontryAutoSignup()
  }

 

  render() {
    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  
    if(this.props.isAuthenticated)
      route = ( 
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        )

    return (
        <div>
          <Layout>
            {route}
          </Layout>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    ontryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
