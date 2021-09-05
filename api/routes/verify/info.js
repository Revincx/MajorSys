const Router = require('koa-router')
const { startVerify } = require('@/modules/controllers/verify.js')
const verifyInfoRouter = new Router()

verifyInfoRouter.get('/api/verify/info', async ctx => {
    let session_id = ctx.session.session_id
    let verifyInfo = await startVerify(session_id)
    ctx.response.body = verifyInfo
})

module.exports = verifyInfoRouter