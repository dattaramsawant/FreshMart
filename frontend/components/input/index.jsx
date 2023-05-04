'use client'

import { PASSWORD_HIDDEN, PASSWORD_VISIBLE } from '@/public/images'
import Image from 'next/image'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styles from './input.module.css'
var classNames = require('classnames')
var _ = require('lodash')

const Input = (props) => {
    const [showPassword,setShowPassword]=useState(false)

    const inputClass = useMemo(()=>props.error ? styles.errorInput : styles.normalInput ,[props.error,props.inputProps])

    const togglePassword=useCallback(()=>{
        setShowPassword(!showPassword)
    },[showPassword])

    return (
        <div className={styles.inputContainer} id="inputMain">
            <label
                className={styles.label}
            >
                {props.label} {props?.inputProps?.isRequired && <span className={styles.requiredSign}>*</span>}
            </label>
            <div className={styles.inputBox} id="inputBox">
                <input 
                    {...props.inputProps}
                    type={props?.inputProps?.type === "password" ? showPassword ? "text" : "password" : props?.inputProps?.type}
                    className={classNames(`${styles.input} input`,inputClass,props?.inputProps?.className)}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id="input"
                />
                {props?.inputProps.type === "password" ?
                    showPassword ? 
                        <Image
                            src={PASSWORD_VISIBLE} 
                            width={15}
                            height={15}
                            loading="lazy"
                            onClick={togglePassword}
                            className={styles.passwordIcon}
                            alt="passwordVisible"
                        /> :
                        <Image 
                            src={PASSWORD_HIDDEN} 
                            width={15}
                            height={15}
                            loading="lazy"
                            onClick={togglePassword}
                            className={styles.passwordIcon}
                            alt="passwordHidden"
                        />
                    : ''
                }
            </div>
            {props?.error && <p className={styles.errorMessage}>{props?.error}</p>}
        </div>
    )
}

export default memo(Input)