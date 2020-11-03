import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/index'
import { Redirect } from 'react-router-dom'

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout()
    }

    render(){
        return <Redirect to='/' />;
    }   
}

const mapDispatchToState = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}
export default connect(null, mapDispatchToState)(Logout)