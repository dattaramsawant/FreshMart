import React from 'react'
import styles from './adminPanel.module.css'
import LeftSideBar from './leftSideBar'
import TopBar from './topBar'

const AdminPanel = (props) => {
    return (
        <div className={styles.adminPanelContainer}>
            <LeftSideBar />
            <div>
                <TopBar
                    pageName={props?.pageName}
                />
                <div className={styles.childrenComponent}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel