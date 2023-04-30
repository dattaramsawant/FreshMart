import classNames from 'classnames'
import React, { useMemo } from 'react'
import styles from './button.module.css'

const Button = (props) => {
    const buttonStatusClassName = useMemo(()=>props?.disabled ? styles.disabledButton : styles.activeButton)
    const buttonTypeClassName = useMemo(() => {
        let tag = 'primaryButton'

        switch (props.tag) {
            case 'primary':
                tag = 'primaryButton'
                break;
                
            case 'outline':
                tag = 'outlineButton'
                break;
        
            default:
                break;
        }

        return `${styles[tag]}`
    }, [props.tag])
    
    return (
        <button
            {...props}
            type={props?.type}
            className={classNames(styles.button,buttonStatusClassName,buttonTypeClassName,props.className)}
        >
            {props.children}
        </button>
    )
}

export default Button