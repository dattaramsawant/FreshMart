'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import useForm from '@/hooks/useForm'
import { login } from '@/services/auth'
import { constant } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import React, { use, useMemo } from 'react'
import styles from './signIn.module.css'

const SignIn = () => {
    const router = useRouter()
    const defaultValue = {
        email: "",
        password: ""
    }
    const validations = useMemo(() => {
        return {
            email: {
                string: {
                    required: {
                        message: "Email is required."
                    },
                    email: {}
                }
            },
            password: {
                string: {
                    required: {
                        message: "Password is required."
                    }
                }
            }
        }
    }, [])

    const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({ defaultValue, validations })

    const onSubmit = async() => {
        const payload={...values}
        const res = await login(payload)
        if(res.status === constant.FAILED){

        }else{
            router.push('/signUp')
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
        >
            <Input
                label="Email"
                inputProps={{
                    placeholder: "Enter Email",
                    isRequired: true,
                    name: 'email',
                    value: values?.email
                }}
                handleChange={handleChange()}
                handleBlur={handleBlur}
                error={errors?.email}
            />
            <Input
                label="Password"
                inputProps={{
                    type:'password',
                    placeholder: "Enter Password",
                    isRequired: true,
                    name: 'password',
                    value: values?.password
                }}
                handleChange={handleChange()}
                handleBlur={handleBlur}
                error={errors?.password}
            />
            <Button
                type="submit"
            >
                Submit
            </Button>
        </form>
    )
}

export default SignIn