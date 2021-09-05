const Router = require('koa-router')
const { getAllColleges } = require('@/modules/controllers/choose.js')
const getCollegeRouter = new Router()

getCollegeRouter.get('/api/college',async ctx => {
    let colleges = await getAllColleges()
    ctx.response.body = {
        status: 200,
        data: colleges
    }
})

module.exports = getCollegeRouter