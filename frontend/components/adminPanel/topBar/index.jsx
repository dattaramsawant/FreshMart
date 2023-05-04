import React from 'react'
import styles from './topBar.module.css'

const TopBar = (props) => {
    return (
        <div className={styles.topBarContainer}>
            <p className={styles.pageName}>{props?.pageName}</p>
        </div>
    )
}

export default TopBar