const Router = require('koa-router')
const { submitChoice } = require('@/modules/controllers/choose.js')
const submitChoiceRouter = new Router()

submitChoiceRouter.post('/api/submit', async ctx => {
    let { major_choice } = ctx.request.body
    let session_id = ctx.session.session_id
    let submitResult = await submitChoice(session_id, major_choice)
    ctx.response.body = submitResult
})

module.exports = submitChoiceRouter