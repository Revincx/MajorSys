const Router = require('koa-router')
const { getChoiceStat } = require('@/modules/controllers/choose.js')

const statRouter = new Router()

statRouter.get('/api/stat', async ctx => {
    let session_id = ctx.session.session_id
    let result = await getChoiceStat(session_id)
    ctx.response.body = result
})

module.exports = statRouter