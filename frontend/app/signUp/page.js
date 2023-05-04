'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import useForm from '@/hooks/useForm'
import { createUser } from '@/services/user'
import { constant } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import styles from './signUp.module.css'

const SignUp = () => {
    const router = useRouter()
    const defaultValue = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    const validations = useMemo(() => {
        return {
            firstName: {
                string: {
                    required: {
                        message: "First Name is required."
                    },
                    spaceNumberSpecialCharNotAllowed: {},
                    minLength: {
                        length: 3
                    }
                }
            },
            lastName: {
                string: {
                    required: {
                        message: "Last Name is required."
                    },
                    spaceNumberSpecialCharNotAllowed: {},
                    minLength: {
                        length: 3
                    }
                }
            },
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
                    },
                    password: {}
                }
            }
        }
    }, [])

    const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({ defaultValue, validations })

    const onSubmit = async() => {
        const payload={...values}
        const res = await createUser(payload)
        if(res.status === constant.FAILED){

        }else{
            router.push('/signIn')
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
        >
            <div className={styles.gridTwoAuto}>
                <Input
                    label="First Name"
                    inputProps={{
                        placeholder: "Enter First Name",
                        isRequired: true,
                        name: 'firstName',
                        value: values?.firstName
                    }}
                    handleChange={handleChange()}
                    handleBlur={handleBlur}
                    error={errors?.firstName}
                />
                <Input
                    label="Last Name"
                    inputProps={{
                        placeholder: "Enter Last Name",
                        isRequired: true,
                        name: 'lastName',
                        value: values?.lastName
                    }}
                    handleChange={handleChange()}
                    handleBlur={handleBlur}
                    error={errors?.lastName}
                />
            </div>
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

export default SignUp