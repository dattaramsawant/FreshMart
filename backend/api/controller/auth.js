const models=require('../../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const sha1 = require('sha1');
const moment = require('moment');
const { sendEmail } = require('../../utils/sendMail');
const { SUCCESS, FAILED } = require('../../constants/constants');

exports.login=async(req,res,next)=>{
    const {email,password}=req.body;

    const checkUser= await models.users.scope('activeUser').findOne({
        where:{
            email: email
        }
    })

    if(!checkUser){
        return res.status(404).json({
            status:FAILED,
            message:'Invalid email or password'
        })
    }

    const matchPassword= await bcrypt.compare(password,checkUser.password)

    if(!matchPassword){
        return res.status(404).json({
            status:FAILED,
            message:"Invalid email or password"
        })
    }

    const accessToken=jwt.sign(
        {userinfo:{
            email: email,
            id: checkUser.id
        }},
        process.env.ACCESS_TOKEN,
        {expiresIn:'15m'}
    )
    
    const refreshToken = jwt.sign(
        {userinfo:{
            email: email,
            id: checkUser.id
        }},
        process.env.REFRESH_TOEKN,
        {expiresIn:'7d'}
    )

    res.cookie('jwt',refreshToken,{
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    res.status(200).json({
        status:SUCCESS,
        message:"User logged in successfully",
        accessToken,
        user:{
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            email: checkUser.email,
            id: checkUser.id
        }
    })
}

exports.refreshToken=async(req,res)=>{
    const cookies=req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken=cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOEKN,
        async (err,decode)=>{
            if(err) return res.status(403).json({ message: 'Forbidden' })

            const checkUser=await models.users.scope('activeUser').findOne({
                where:{
                    email: decode.userinfo.email
                }
            })

            if (!checkUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken=jwt.sign(
                {userinfo:{
                    email: checkUser.email,
                    id: checkUser.id
                }},
                process.env.ACCESS_TOKEN,
                {expiresIn:'7d'}
            )

            res.status(200).json({
                status:SUCCESS,
                message:"User logged in successfully",
                accessToken,
                user:{
                    firstName: checkUser.firstName,
                    lastName: checkUser.lastName,
                    email: checkUser.email,
                    id: checkUser.id
                }
            })
        }
    )
}

exports.logout=async(req,res)=>{
    const cookies=req.cookies
    if(!cookies.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly: true, secure: true})
    return res.status(200).json({
        status:SUCCESS,
        message:"User logged out"
    })
}

exports.forgotPassword=async(req,res)=>{
    const email=req.body.email
    const checkUser=await models.users.scope('activeUser').findOne({
        where:{
            email:email
        }
    })

    if(!checkUser) return res.status(404).json({status:FAILED,message:"User not found"})

    const sendToken=await sha1(`$%${moment().format()}@#`);
    console.log('sendToken', sendToken)
}
exports.sendMail=async(req,res)=>{
    await sendEmail('dattaram@nimapinfotech.cm',process.env.EMAIL,'','Test',`<p>Test mail</p>`)
}