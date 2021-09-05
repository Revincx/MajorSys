const Router = require('koa-router')
const { createSession } = require('@/modules/controllers/session.js')

const createSessionRouter = new Router()

createSessionRouter.post('/api/createSession', async ctx => {
    let { stu_id, pass } = ctx.request.body
    let sessionResult = await createSession(stu_id, pass)
    ctx.session.session_id = sessionResult.session_id
    delete sessionResult.session_id
    ctx.response.body = sessionResult
})

module.exports = createSessionRouter