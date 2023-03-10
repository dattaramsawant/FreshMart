const jwt = require('jsonwebtoken');
const { FAILED } = require('../../constants/constants');

const checkAuth = async(req,res,next)=>{
    const authHeader= req.headers.authorization || req.headers.Authorization

    if(!authHeader) return res.status(401).json({ status:FAILED, message: 'Unauthorized' })

    const fullToken = authHeader.split(' ')
    if(fullToken[0] !== 'Bearer'){
        return res.status(401).json({ status:FAILED, message: 'Unauthorized' })
    }

    const token=authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err,decode) => {
            if(err) return res.status(403).json({ status:FAILED, message: 'Forbidden'})
            req.email = decode.userinfo.email
            req.id = decode.userinfo.id
            next()
        }
    )
}

module.exports = checkAuth;