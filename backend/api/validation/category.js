const { body } = require("express-validator");
const { IMAGE_TYPE } = require("../../constants/constants");

exports.categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.'),

    body('image')
        .custom(async (value,{req}) => {
            if(req.file){
                if(!(IMAGE_TYPE.includes(req?.file?.filename?.split('.')?.at(-1)))){
                    return Promise.reject("Only .png, .jpeg, .jpg or .svg image type is allowed.")
                }
            }else{
                return Promise.reject("Image is required")
            }
        })

]