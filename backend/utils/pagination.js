const _ = require('lodash')

const paginationWithPageNumberPageSize = async(searchParams,fromParams,toParams,sortParams,orderParams)=>{
    const search = _.isEmpty(searchParams) ? '' : searchParams
    const from = fromParams || 1
    const to = toParams || 1000
    const sort = sortParams || 'createdAt'
    const order = orderParams || 'DESC'
    const pageSize = Number(to)
    const offset = Number((pageSize * (from - 1)))

    return {search,offset,pageSize,sort,order}
}

module.exports = {
    paginationWithPageNumberPageSize
}