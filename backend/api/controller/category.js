const { CATEGORY_IMAGE_LOCATION_WITHOUT_PUBLIC, SUCCESS, FAILED } = require("../../constants/constants");
const models = require("../../models");
const { removeFiles } = require("../../utils/deleteFiles");
const { paginationWithPageNumberPageSize } = require("../../utils/pagination");
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.createCategory = async(req,res,next)=>{
    const {name, description} = req.body;

    const checkCategory = await models.categories.findAll({
        where:{
            name: name
        }
    })

    if(checkCategory.length){
        return res.status(404).json({
            status:FAILED,
            message: "Category is already present"
        })
    }
    const imageUrl = process.env.BASE_URL + CATEGORY_IMAGE_LOCATION_WITHOUT_PUBLIC + req.file.filename

    await models.categories.create({name,description,image: imageUrl})

    return res.status(201).json({
        status:SUCCESS,
        message: "Category created successfully."
    })
}

exports.getCategory = async(req,res,next)=>{
    const {search,pageNumber,pageSize,sort,orderby}=req?.query;
    const pagination = await paginationWithPageNumberPageSize(search,pageNumber,pageSize,sort,orderby)
    const searchQuery = {
        [Op.or]:[
            {
                name: {[Op.like]: `%${pagination?.search}%`}
            }
        ]
    }

    const data=await models.categories.scope('activeCategory').findAll({
        where: searchQuery,
        attributes:{
            exclude: ['isDeleted']
        },
        offset: pagination?.offset,
        limit: pagination?.pageSize,
        order: [[pagination?.sort,pagination?.order]]
    })

    return res.status(200).json({
        status:SUCCESS,
        data
    })
}

exports.getCategoryById = async(req,res,next)=>{
    const id=req?.params?.id

    const data=await models.categories.scope('activeCategory').findOne({
        where:{
            id: id
        },
        attributes:{
            exclude: ['isDeleted']
        }
    })

    return res.status(200).json({
        status: SUCCESS,
        data: data || "Category not found"
    })
}

exports.removeCategory=async(req,res,next)=>{
    const categoryIds = req.body.categoryIds

    let findCategory = await models.categories.scope("activeCategory").findAll({
        where:{
            id: categoryIds
        },
        attributes:['id']
    })

    findCategory = findCategory.map(a=>a.id)

    if(!findCategory.length){
        return res.status(404).json({
            status: FAILED,
            message: "Category not found"
        })
    }

    const inValidCategory=categoryIds.filter(a=>findCategory.indexOf(a)==-1)

    await models.categories.update(
        {isDeleted: 1},
        {
            where:{
                id:{
                    [Op.in]: findCategory
                }
            }
        }
    )

    return res.status(200).json({
        message: SUCCESS,
        data:{
            deletedCategories: findCategory,
            categoriesNotFound: inValidCategory
        }
    })
}

exports.activateCategories=async(req,res,next)=>{
    const categoryIds = req.body.categoryIds
    
    let findCategory = await models.categories.scope("inActiveCategory").findAll({
        where:{
            id: categoryIds
        },
        attributes:['id']
    })

    findCategory = findCategory.map(a=>a.id)

    if(!findCategory.length){
        return res.status(404).json({
            status: FAILED,
            message: "Category not found"
        })
    }

    const inValidCategory=categoryIds.filter(a=>findCategory.indexOf(a)==-1)

    await models.categories.update(
        {isDeleted: 0},
        {
            where:{
                id:{
                    [Op.in]: findCategory
                }
            }
        }
    )

    return res.status(200).json({
        message: SUCCESS,
        data:{
            deletedCategories: findCategory,
            categoriesNotFound: inValidCategory
        }
    })
}

exports.updateCategory = async(req,res,next)=>{
    const {description} = req.body
    const {id} = req.params

    const checkCategory = await models.categories.scope('activeCategory').findOne({
        where:{
            id: id
        }
    })

    if(!checkCategory){
        return res.status(404).json({
            status: FAILED,
            message: "Category not found"
        })
    }

    const checkImage = req?.file?.filename

    if(checkImage){
        const imageUrl = process.env.BASE_URL + CATEGORY_IMAGE_LOCATION_WITHOUT_PUBLIC + checkImage
        const previousImagePath = checkCategory.image.split('/images')
        const removeFilePath = `public/images${previousImagePath[1]}`
        const status=await removeFiles(removeFilePath)

        if(status.status === SUCCESS){
            await models.categories.update(
                {description,image: imageUrl},
                {
                    where:{
                        id: id
                    }
                }
            )

            return res.status(200).json({
                status: SUCCESS,
                message:"Category updated successfully"
            })
        }else{
            return res.status(404).json(err)
        }
    }else{
        await models.categories.update(
            {description},
            {
                where:{
                    id: id
                }
            }
        )

        return res.status(200).json({
            status: SUCCESS,
            message:"Category updated successfully"
        })
    }
}