'use client'

import { adminLeftPanel } from '@/config/adminLeftPanel'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './leftSideBar.module.css'

const LeftSideBar = () => {
    const pathname = usePathname()

    return (
        <div className={styles.leftSideBarContainer}>
            <div className={styles.sideBarLogo}>
                <h1>Fresh Mart</h1>
            </div>
            <ul className={styles.menuContainer}>
                {adminLeftPanel.map((data,i)=>{
                    return(
                        <li className={styles.linkContainer} key={i}>
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

export default LeftSideBar