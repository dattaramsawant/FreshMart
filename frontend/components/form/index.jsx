import useValidation from '@/hooks/useValidation';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styles from './form.module.css';

var classNames = require('classnames')
var _ = require('lodash')

const Form = (props) => {     
    const [formDetails,setFormDetails]=useState({
        isValid: false,
        isSubmit: false,
        isBlur: {},
        errors: {},
        values:{...props.defaultValue}
    })
    const [validations,setValidations]=useState({})
    const [errors,setErrors]=useValidation({})

    const formRef=useRef();

    const handleSubmit=useCallback((e)=>{
        e.preventDefault()
        setErrors(validations,formDetails?.values)
    },[formDetails,validations,errors])

    const handleChange=useCallback((e)=>{
        const {name,value} = e.target
        setFormDetails({
            ...formDetails,
            values:{
                ...formDetails.values,
                [name]: value
            }
        })
        if(formDetails?.isSubmit || formDetails?.isBlur?.[name]){
            handleValidation({name,value})
        }
    },[formDetails,errors])

    const handleBlur=useCallback((e)=>{
        const {name,value} = e.target

        setFormDetails({
            ...formDetails,
            isBlur:{
                ...formDetails.isBlur,
                [name]: true
            }
        })

        handleValidation({name,value})        
    },[formDetails,errors,validations])

    const handleValidation=useCallback(({name,value})=>{
        setErrors(validations[name],value,name)
    },[validations,errors])

    useEffect(()=>{
        if(!(_.isEmpty(errors))){
            const isValid = Object.values(errors).filter(Boolean)
            setFormDetails({
                ...formDetails,
                isSubmit: true,
                isValid: !Boolean(isValid.length),
                errors
            })
            if(!Boolean(isValid.length)){
                props.handleSubmit(formDetails.values)
            }
        }
    },[errors])

    useEffect(()=>{
        if(formRef.current){
            const keys=[]
            Array.from(formRef?.current?.children)?.map(inputMain=>{
                if(inputMain.id === "inputMain"){
                    Array.from(inputMain.children).map(inputBox=>{
                        if(inputBox.id === "inputBox"){
                            Array.from(inputBox.children).map(input=>{
                                if(input.id === "input"){
                                    keys.push(input.name)
                                }
                            })
                        }
                    })
                }
            })

            const validation={}

            keys.map(key=>{
                if(props?.validation?.[key]){
                    Object.assign(validation,{[key]:props?.validation?.[key]})
                }
            })

            setValidations(validation)
        }
    },[formRef])

    return (
        <form
            className={classNames(styles.form,props?.className)}
            onSubmit={handleSubmit}
            ref={formRef}
        >
            {props.render({formDetails,handleChange,handleBlur})}
            {/* <Component
                formDetails={formDetails}
                handleChange={handleChange}
                handleBlur={handleBlur}
            /> */}
        </form>
    )
}

export default memo(Form)