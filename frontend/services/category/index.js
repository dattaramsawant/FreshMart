const { default: useAxiosPrivate } = require("@/hooks/useAxiosPrivate")
const { API_URL } = require("../apiEndPoints")

const axios = useAxiosPrivate()

const getCategory = async(payload)=>{
    console.log('payload', payload)
    try {
        const response = await axios.get(API_URL.CATEGORY)
        console.log('response', response)
    } catch (error) {
        
    }
}

export {
    getCategory
}