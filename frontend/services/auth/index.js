import { constant } from '@/utils/constants';
import { getCookies, setCookie } from 'cookies-next';
import { API_URL } from '../apiEndPoints';
import axios from '../axios';

const login = async(payload) => {
    const response = await axios.post(API_URL.LOGIN,payload)

    // setCookie(constant.JWT_TOKEN,response.data.refreshToken)
    setCookie(constant.ACCESS_TOKEN,response.data.accessToken)
    setCookie(constant.USER_INFO,response.data.user)
    
    console.log('response', response)

    return response.data;
}

const refresh = async() => {
    const response = await axios.post(API_URL.REFRESH_TOKEN,null,{withCredentials:true})

    // setCookie(constant.JWT_TOKEN,response.data.refreshToken)
    setCookie(constant.ACCESS_TOKEN,response.data.accessToken)
    setCookie(constant.USER_INFO,response.data.user)

    return response.data.accessToken;
}

export {
    login,
    refresh
}