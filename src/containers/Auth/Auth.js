import React, { Component } from 'react' 
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

class Auth extends Component {
    state = {
        controls: {
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
        }  
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        console.log(event.target.value)
        console.log(this.state.controls[controlName].valid)
        const updateControl = {...this.state.controls,
                            [controlName]: {...this.state.controls[controlName],
                                            value: event.target.value,
                                            valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                                            isTouched: true
                                        }
                                }
        this.setState({controls: updateControl})
        }


    

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))
        return (
            <div className = {classes.Auth}>
            <h4>Authentification</h4>
            <div>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </div>
        </div>
        )
    
    }

}

export default Auth