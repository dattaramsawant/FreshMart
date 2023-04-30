const { API_URL } = require("../apiEndPoints")
const { default: axios } = require("../axios")

const createUser = async(payload)=>{
    try {
        const res= await axios.post(API_URL.USER,payload)
        return res.data
    } catch (error) {
        console.log('error', error)
        return error
    }
}

export {
    createUser
}