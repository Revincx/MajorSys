const Koa = require('koa')
const session = require('koa-session')
const cors = require('koa-cors')
const Parser = require('koa-bodyparser')

const createSessionRouter = require('./createSession.js')
const getAllCollegesRouter = require('./choose/college.js')
const getMajorRouter = require('./choose/major.js')
const submitChoiceRouter = require('./choose/choose.js')

const verifyInfoRouter = require('./verify/info.js')
const sendVerifyRouter = require('./verify/send.js')
const verifyCodeRouter = require('./verify/verify.js')

const myChoiceRouter = require('./choose/my.js')
const statRouter = require('./choose/stat.js')

const app = new Koa()

app.use(cors({
    origin: '*'
}))

app.keys = [ 'ThE*SeCrEt' ]

app.use(session({
    key: 'sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: false,
    renew: false,
    sameSite: true,
},app))

app.use(Parser())

app.use(createSessionRouter.routes())

app.use(async (ctx,next) => {
    if(!ctx.session.session_id)
    {
        ctx.response.body = {
            status: 400,
            message: "还没有登录 !"
        }
        return
    }
    await next()
})

app.use(getAllCollegesRouter.routes())
app.use(getMajorRouter.routes())

app.use(myChoiceRouter.routes())
app.use(statRouter.routes())

app.use(verifyInfoRouter.routes())
app.use(sendVerifyRouter.routes())
app.use(verifyCodeRouter.routes())

app.use(submitChoiceRouter.routes())

module.exports = app