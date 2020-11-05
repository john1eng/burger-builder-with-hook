import React, { useState }from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

        return (
            <Aux>
                <Toolbar 
                    isAuthenticated={props.isAuth}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer 
                    open={showSideDrawer} 
                    closed={sideDrawerClosedHandler}
                    isAuthenticated={props.isAuth} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
    }

const mapStateToProps = (state) => {
    return{
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);