import { handleValidation } from '@/functions/handleValidation'
import React, { useState } from 'react'
const _ = require('lodash')

const useForm = ({defaultValue,validations}) => {
    const [values,setValues]=useState(defaultValue)
    const [isBlur,setIsBlur]=useState({})
    const [isSubmit,setIsSubmit]=useState(false)
    const [errors,setErrors]=useState({})

    const handleChange=(fun)=>{
        return e =>{
            const {name,value}=e.target

            setValues({
                ...values,
                [name]: value
            })

            if(isSubmit || isBlur?.[name]){
                const result = handleValidation(validations[name],value,name)
                if(result?.[name] !== errors?.[name]){
                    setErrors(prev=>({
                        ...prev,
                        ...result
                    }))
                }
            }
            
            if(fun){
                return fun(e)
            }
        }
    }

    const handleBlur=(e)=>{
        const {name,value}=e.target

        if(!isBlur?.[name]){
            setIsBlur({
                ...isBlur,
                [name]: true
            })
        }

        const result=handleValidation(validations[name],value,name)

        if(result?.[name] !== errors?.[name]){
            setErrors(prev=>({
                ...prev,
                ...result
            }))
        }
    }

    const handleSubmit=(fun)=>{
        return e => {
            e.preventDefault();
            const validationResult = handleValidation(checkValidValidationObject(),values)
            setErrors({...validationResult})
            if(!isSubmit){
                setIsSubmit(true)
            }
            const checkIsValid = Boolean(!Object.values(validationResult).filter(Boolean).length)

            if(checkIsValid && fun){
                return fun();
            }
        }
    }

    const checkValidValidationObject = () => {
        let totalInputTag = document.getElementsByClassName('input')
        totalInputTag = Array.from(totalInputTag);

        const validationKey =  Boolean(totalInputTag.length) && totalInputTag.map(input => {
            return input.name
        })

        const validation={}
        validationKey.map(key=>{
            if(validations?.[key]){
                Object.assign(validation,{[key]:validations?.[key]})
            }
        })

        return validation;
    }

    return {values,errors,handleChange,handleBlur,handleSubmit}
}

export default useForm