const multer = require('multer');
const { IMAGE_TYPE, CATEGORY_IMAGE_LOCATION } = require('../../constants/constants');

const imageFilter = (req,file,cb)=> {
    if(IMAGE_TYPE.includes(file.mimetype.split('/')[1])){
        cb(null,true)
    }else{
        cb("Please upload .png, .jpeg, .jpg or .svg file", false)
    }
}

const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        const extension = file.originalname.split('.').at(-1)
        cb(null,`${Date.now()}.${extension}`)
    },
    destination: CATEGORY_IMAGE_LOCATION,
})

const uploadFile = multer({storage,fileFilter: imageFilter})

module.exports = uploadFile