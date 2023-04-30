import { refresh } from '@/services/auth';

const useRefreshToken=()=>{
    return refresh();
}

export default useRefreshToken;