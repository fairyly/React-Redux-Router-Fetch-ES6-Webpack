import React, { Component } from 'react'
import 'styles/App.scss'
import classNames from 'classnames'

class FormInput extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
           
            'inputError': false,
            'errorText': '不能为空'
        }
    }

    handleBlur(e) {

    	const input = e.target.value
        if (this.props.required) {
            if (input === '' || input === null) {
                this.setState({ 'inputError': true })
            } else {
            	;
            	switch(this.props.type) {
            		case 'text' :
            			this.setState({ 'inputError': false })
            			break
            		case 'email':
            			this.emailValid(input).bind(this)
            			break
            		case 'phone':
            			this.phoneValid(input).bind(this)
            			break;
            		default:
            			this.setState({ 'inputError': false })
            	}
                this.setState({ 'inputError': false })
            }

        }else{

        }
    }

    handleFocus() {
        this.setState({ 'inputError': false })
    }

   
    emailValid(email){
    	let reg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    	console.log(reg.test(email));
    	if(reg.test(email)){
    		this.setState({ 'inputError': false })
    	}else{
    		this.setState({ 'inputError': true})
    		this.setState({'errorText':this.props.errorText})
    	}
    }
    phoneValid(phone){
    	let reg = /^0?1[3|4|5|8][0-9]\d{8}$/
    	if(reg.test(phone)){
    		this.setState({ 'inputError': false })
    	}else{
    		this.setState({ 'inputError': true})
    		this.setState({'errorText':this.props.errorText})
    	}

    }

    render() {
        const inputClass = classNames({
            'form-input': true,
            'form-input-error': this.state.inputError
        })
        const pClass = classNames({
            'form-error-message': true,
            'hide': !this.state.inputError
        })

        return (

            <div className = 'form-input-row' >
		        <input className = { inputClass }
		        defaultValue = 'hello'
		        onFocus = { this.handleFocus.bind(this) }
		        onBlur = { this.handleBlur.bind(this) }
		        /> 
		        <p className = { pClass } > { this.state.errorText } </p>
            </div>
        )
    }
}

export default FormInput
