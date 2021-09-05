const Router = require('koa-router')
const { sendCode } = require('@/modules/controllers/verify.js')
const verifySendRouter = new Router()

verifySendRouter.post('/api/verify/send', async ctx => {
    let { type } = ctx.request.body
    let session_id = ctx.session.session_id
    let sendResult = await sendCode(session_id, type)
    ctx.response.body = sendResult
})

module.exports = verifySendRouter