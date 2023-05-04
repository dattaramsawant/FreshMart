'use client'

import { API_URL } from '@/services/apiEndPoints'
import { getCategory } from '@/services/category'
import useSWR, { useSWRConfig } from 'swr'
import styles from './category.module.css'

const Category = () => {
    const {isLoading,error,data,mutate} = useSWR(API_URL.CATEGORY,getCategory,{revalidateOnFocus:false})

    console.log('isLoading', isLoading)
    console.log('error', error)
    console.log('data', data)
    console.log('isLoading', isLoading)

    return (
        <div>
            abc
            {/* {data} */}
        </div>
    )
}

export default Category