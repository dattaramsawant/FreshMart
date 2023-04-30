import { email, exactLength, maxLength, minLength, password, required, spaceNumberSpecialCharNotAllowed } from "./validations";
var _ = require('lodash')

export const handleValidation=(validation,value,name)=>{
    const types=['string','number','boolean','date','email']
    let errors={}

    const string=(data,value)=>{
        let validationKeys = Object.keys(data);
        const requiredIndex = validationKeys.indexOf('required')
        if(validationKeys.includes('required') && requiredIndex !== 0){
            validationKeys.splice(requiredIndex,1)
            validationKeys = ['required', ...validationKeys]
        }
        let errorMessage={}

        validationKeys.map((key,i) =>{
            switch (key) {
                case "required":
                    errorMessage = {
                        ...errorMessage,
                        required: required({
                            value,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "minLength":
                    errorMessage = {
                        ...errorMessage,
                        minLength: minLength({
                            value,
                            length: data[key]?.length,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "maxLength":
                    errorMessage = {
                        ...errorMessage,
                        maxLength: maxLength({
                            value,
                            length: data[key]?.length,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "exactLength":
                    errorMessage = {
                        ...errorMessage,
                        exactLength: exactLength({
                            value,
                            length: data[key]?.length,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "spaceNumberSpecialCharNotAllowed":
                    errorMessage = {
                        ...errorMessage,
                        spaceNumberSpecialCharNotAllowed: spaceNumberSpecialCharNotAllowed({
                            value,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "email":
                    errorMessage = {
                        ...errorMessage,
                        email: email({
                            value,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;

                case "password":
                    errorMessage = {
                        ...errorMessage,
                        password: password({
                            value,
                            message: data[key]?.message
                        }) || ''
                    }
                    break;
            
                default:
                    break;
            }
        })
        const errorMessageValues = Object.values(errorMessage)
        const validErrors = errorMessageValues.filter(Boolean)
        return validErrors[0];
    }

    const validate=(validation,value,name)=>{
        const validationKey = Object.keys(validation)[0].toLowerCase();
        if(_.includes(types,validationKey)){
            switch (validationKey) {
                case 'string':
                    return {
                        [name]: string(validation.string,value)
                    }
                    // setErrors({
                    //     ...errors,
                    //     [name]: string(validation.string,value)
                    // })
                    break;
            
                default:
                    break;
            }
        }else{
            throw new Error(`${Object.keys(validation)[0]} is not a valid key.`)
        }
    }

    const checkValidation = (validation,value,name) =>{
        if(name){
            const validateResult = validate(validation,value,name)
            errors = {
                ...errors,
                ...validateResult
            }
        }else{
            const validateKey=Object.keys(validation)
            let finalResult = {}

            validateKey.map(data=>{
                const validateResult = validate(validation[data],value[data],data)
                finalResult = {...finalResult,...validateResult}
            })
            errors = {
                ...errors,
                ...finalResult
            }
        }

        return errors;
    }

    return checkValidation(validation,value,name)
}