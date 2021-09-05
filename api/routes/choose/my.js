const Router = require('koa-router')
const { getMyChoiceALt } = require('@/modules/controllers/choose.js')

const myChoiceRouter = new Router()

myChoiceRouter.get('/api/myChoice', async ctx => {
    let session_id = ctx.session.session_id
    let result = await getMyChoiceALt(session_id)
    ctx.response.body = result
})

module.exports = myChoiceRouter