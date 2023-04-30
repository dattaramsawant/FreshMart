'use client';

import { navbarConfig } from '@/config/navbar.config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './navbar.module.css'

const Navebar = () => {
    const pathname = usePathname()

    return (
        <div className={styles.navbar}>
            <h1 className={styles.navbarLogo}>
                Fresh Mart
            </h1>
            <ul className={styles.linkContainer}>
                {navbarConfig.map(data=>{
                    return(
                        <li>
                            <Link 
                                className={pathname === data.href ? styles.activeLink : styles.link}
                                href={data.href}
                            >
                                {data.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navebar