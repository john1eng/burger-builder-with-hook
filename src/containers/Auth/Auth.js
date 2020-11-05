import React, { useEffect, useState } from 'react' 
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom'
import { updateObject, checkValidity } from '../../shared/utility'

const auth = (props) => {
    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                isTouched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                isTouched: false
            },   
        }) 
    const [isSignup, setIsSignup] = useState(true)
    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props

    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/')
            onSetAuthRedirectPath()
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updateControlName = updateObject(controls[controlName],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                isTouched: true
            })
        const updateControl = updateObject(controls,
             {
                [controlName]: updateControlName
             })    
        setControls(updateControl)
        }

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthHandler = () => {
        setIsSignup(!isSignup)
    }

        const formElementsArray = [];
        for(let key in controls){
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }
        let form = 
                formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation} 
                        touched = {formElement.config.isTouched}
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                ))
        if(props.loading)
            form = <Spinner />   
        
        let errorMessage = null;
        
        if(props.error)
            errorMessage = <p>{props.error.message}</p>

        let redirect = null;
        
        if(props.isAuthenticated)
            redirect = <Redirect to={props.authRedirectPath} />

        return (
            <div className = {classes.Auth}>
            {redirect}
            <h4>Authentification</h4>
            {errorMessage}
            <div>
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={switchAuthHandler} 
                            btnType="Danger">SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        </div>
        )
    
    }

const mapStateToProps = (state) => {
    return {
        loading:    state.auth.loading,
        error:      state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password, mode) => dispatch(actions.auth(email, password, mode)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth)