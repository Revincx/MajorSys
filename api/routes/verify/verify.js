const Router = require('koa-router')
const { verifyCode } = require('@/modules/controllers/verify.js')
const verifyCodeRouter = new Router()

verifyCodeRouter.post('/api/verify/verify', async ctx => {
    let { type, code } = ctx.request.body
    let session_id = ctx.session.session_id
    let verifyResult = await verifyCode(session_id, code, type)
    ctx.response.body = verifyResult
})

module.exports = verifyCodeRouter