const express = require('express');
const { createCategory, getCategory, getCategoryById, removeCategory, activateCategories, updateCategory } = require('../api/controller/category');
const checkAuth = require('../api/middleware/checkAuth');
const uploadFile = require('../api/middleware/uploadCategoryImage');
const validationError = require('../api/middleware/validationError');
const { categoryValidation } = require('../api/validation/category');
const errorWrap = require('../utils/errorWrap')
const route = express.Router();

route.get('/',checkAuth,errorWrap.wrapper(getCategory));

route.post('/',checkAuth,uploadFile.single('image'),categoryValidation,validationError,errorWrap.wrapper(createCategory))

route.get('/:id',checkAuth,errorWrap.wrapper(getCategoryById));

route.put('/remove',checkAuth,errorWrap.wrapper(removeCategory));

route.put('/activate',checkAuth,errorWrap.wrapper(activateCategories));

route.put('/update/:id',checkAuth,uploadFile.single('image'),errorWrap.wrapper(updateCategory));

module.exports = route;