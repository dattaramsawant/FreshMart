import { constant } from '@/utils/constants';
import { getCookies, setCookie } from 'cookies-next';
import { API_URL } from '../apiEndPoints';
import axios from '../axios';

const refresh = async() => {
    const response = await axios.post(API_URL.REFRESH_TOKEN)

    setCookie(constant.REFRESH_TOKEN,response.data.accessToken)
    setCookie(constant.USER_INFO,response.data.user)

    return response.data.accessToken;
}

export {
    refresh
}