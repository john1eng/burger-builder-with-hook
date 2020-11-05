import React, { useEffect, Suspense } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from '../src/store/actions/index'
// import asyncComponent from './hoc/asyncComponenet/asyncComponent'

const Checkout = React.lazy(()=> {
  return import('./containers/Checkout/Checkout')
})

const Order = React.lazy(()=> {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(()=> {
  return import('./containers/Auth/Auth');
})

const app = (props) => {

  const { ontryAutoSignup } = props;
  useEffect(() => {
    ontryAutoSignup()
  }, [ontryAutoSignup])
 
    let route = (
      <Switch>
        <Route path="/auth" render={(props)=><Auth {...props}/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  
    if(props.isAuthenticated)
      route = ( 
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />
          <Route path="/orders" render={(props) => <Order {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={(props) => <Auth {...props} />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        )

    return (
        <div>
          <Layout>
            <Suspense fallback={<p>Loading...</p>}>
              {route}
            </Suspense>
          </Layout>
        </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
