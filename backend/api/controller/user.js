const models = require("../../models");
const bcrypt = require('bcrypt');
const { paginationWithPageNumberPageSize } = require("../../utils/pagination");
const { SUCCESS, FAILED } = require("../../constants/constants");
const sequelize = models.Sequelize;
const Op = sequelize.Op;
const saltRounds = 10;

exports.createUser = async(req,res,next)=>{
    const {firstName,lastName,email,password}=req.body;

    const checkUser=await models.users.findAll({
        where:{
            email: email
        }
    })

    if(checkUser.length){
        return res.status(404).json({
            status:FAILED,
            message: "Email already used."
        })
    }

    const hashPassword= await bcrypt.hash(password,saltRounds)
    await models.users.create({
        firstName,lastName,email,password: hashPassword
    })

    return res.status(201).json({
        status: SUCCESS,
        message: "User created successfully"
    })
}

exports.getUser=async(req,res,next)=>{
    const {search,pageNumber,pageSize,sort,orderby}=req?.query;
    const pagination = await paginationWithPageNumberPageSize(search,pageNumber,pageSize,sort,orderby)
    const searchQuery = {
        [Op.or]:[
            {
                firstName:{[Op.like]: `%${pagination?.search}%`}
            },
            {
                lastName:{[Op.like]: `%${pagination?.search}%`}
            },
            {
                email:{[Op.like]: `%${pagination?.search}%`}
            }
        ]
    }

    const userData=await models.users.scope('activeUser').findAll({
        where: searchQuery,
        include: {
            model: models.roles,
            as: "role",
            attributes: ['id','roleName']
        },
        attributes:{
            exclude:['password','isDeleted','forgetId','roleId']
        },
        offset: pagination?.offset,
        limit: pagination?.pageSize,
        order: [[pagination?.sort,pagination?.order]]
    })

    return res.status(200).json({
        status:SUCCESS,
        data: userData
    })
}

exports.getUserById=async(req,res,next)=>{
    const id=req?.params?.id
    
    const findUser = await models.users.findOne({
        where:{
            id: id
        },
        attributes:{
            exclude:['password','isDeleted','forgetId','roleId']
        }
    })

    if(!findUser){
        return res.status(404).json({
            status:FAILED,
            message:"User not found"
        })
    }

    return res.status(200).json({
        status:SUCCESS,
        data: findUser
    })
}

exports.removeUsers=async(req,res,next)=>{
    const userIds=req.body.userId;

    let findUser=await models.users.scope('activeUser').findAll({
        where:{
            id:userIds,
        },
        attributes:['id']
    })

    findUser=findUser.map(a=>a.id)

    if(!findUser.length){
        return res.status(404).json({
            status:FAILED,
            message:"User not found"
        })
    }

    const inValidUser=userIds.filter(a=>findUser.indexOf(a)==-1)

    await models.users.update(
        {isDeleted: 1},
        {
            where:{
                id: {
                    [Op.in]:userIds
                }
            },
        }
    )

    return res.status(200).json({
        status:SUCCESS,
        data:{
            deletedUserId: findUser,
            userNotFound: inValidUser
        }
    })
}

exports.activateUsers=async(req,res,next)=>{
    const userIds=req.body.userId

    let findUser=await models.users.scope('inActiveUser').findAll({
        where:{
            id:userIds
        },
        attributes:['id']
    })

    findUser=findUser.map(a=>a.id)

    if(!findUser.length){
        return res.status(404).json({
            status:FAILED,
            message:"User not found"
        })
    }

    const inValidUser=userIds.filter(a=>findUser.indexOf(a)==-1)

    await models.users.update(
        {isDeleted: 0},
        {
            where:{
                id: {
                    [Op.in]:userIds
                }
            },
        }
    )

    return res.status(200).json({
        status:SUCCESS,
        data:{
            activateUserId: findUser,
            userNotFound: inValidUser
        }
    })
}

exports.changePassword=async(req,res)=>{
    const currentPassword=req.body.currentPassword;
    const newPassword=req.body.newPassword;
    const confirmPassword=req.body.confirmPassword;
    const email=req.body.email;

    const checkUser=await models.users.scope('activeUser').findOne({
        where:{
            email:email
        }
    })

    if(!checkUser) return res.status(404).json({status:FAILED,message:"User not found"})

    const checkCurrentPassword = await bcrypt.compare(currentPassword,checkUser.password)

    if(!checkCurrentPassword) return res.status(404).json({status:FAILED,message:"Current password not match"})

    if(newPassword !== confirmPassword) return res.status(404).json({status:FAILED,message:"new password and confirm password not same."})

    const hashPassword= await bcrypt.hash(newPassword,saltRounds)

    await models.users.update(
        {password: hashPassword},
        {where:{
            id: checkUser.id
        }}
    )

    return res.status(200).json({
        status:SUCCESS,
        message:"Password update successfully."
    })
}