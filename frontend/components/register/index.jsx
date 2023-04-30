'use client';

import { LEFT_ICON } from '@/public/images'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './register.module.css'

const Register = (props) => {
    const router = useRouter()

    return (
        <div className={styles.registerContainer}>
            <div className={styles.leftSide}>
                <div className={styles.leftSideHeader}>
                    <Image 
                        src={LEFT_ICON} 
                        width={25}
                        loading="lazy"
                        className={styles.backIcon}
                        onClick={()=>router.back()}
                        alt="Back Icon"
                    />
                    <p className={styles.welcomeText}>Welcome to FreshMart</p>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.rightSideContainer}>
                    <h2 className={styles.pageName}>{props.pageName}</h2>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Register