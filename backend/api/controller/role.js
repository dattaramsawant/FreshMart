const { SUCCESS, FAILED } = require("../../constants/constants");
const models = require("../../models");
const { paginationWithPageNumberPageSize } = require("../../utils/pagination");
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.createRole = async(req,res,next)=>{
    const {roleName,description} = req.body;

    const checkRole = await models.roles.findAll({
        where:{
            roleName: roleName
        }
    })

    if(checkRole.length){
        return res.status(404).json({
            status:FAILED
        })
    }

    await models.roles.create({
        roleName, description, userId: req.id
    })

    return res.status(201).json({
        status:SUCCESS,
        message:"Role created successfully."
    })
}

exports.getRoles = async(req,res,next)=>{
    const data=await models.roles.findAll({
        include: [{
            model: models.users,
            as: 'user',
            attributes: ['id','firstName','lastName']
        }]
    })

    return res.status(200).json({
        status:SUCCESS,
        data: data
    })
}