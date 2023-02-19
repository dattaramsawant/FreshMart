const fs=require('fs')
const { SUCCESS } = require('../constants/constants')

exports.removeFiles=(filePath)=>new Promise((resolve,reject) => {
    fs.unlink(filePath,(err)=>{
        if(err){
            reject({
                status:FAILED,
                message: err.message
            })
        }else{
            resolve({
                status: SUCCESS,
                message: "File removed successfully"
            })
        }
    })
})