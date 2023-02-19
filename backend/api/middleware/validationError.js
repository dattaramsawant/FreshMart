const { validationResult } = require("express-validator")

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    let errorsObj={}

    errors.errors.map(err=>{
        if(!errorsObj[err['param']]){
            errorsObj = {
                ...errorsObj,
                [err['param']]: err
            }
        }
    })
    const errorFormat = Object.values(errorsObj)?.map(err=>{
        return{
            key: err?.param,
            error: err?.msg
        }
    })

    if(!errors?.isEmpty()){
        return res.status(400).json({
            message: errorFormat
        })
    }else{
        next()
    }
}