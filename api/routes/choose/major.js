const Router = require('koa-router')
const { getMajor } = require('@/modules/controllers/choose.js')
const getMajorRouter = new Router()

getMajorRouter.get('/api/major/:college_id', async ctx => {
    let college_id = ctx.params.college_id
    let majors = await getMajor(college_id)
    ctx.response.body = {
        status: 200,
        data: majors
    }
})

module.exports = getMajorRouter