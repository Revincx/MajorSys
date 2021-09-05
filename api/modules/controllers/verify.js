const { getSessionInfo, setVerifySession, setVerified } = require('@/modules/database/session.js')
const { getVerifyMethods, sendVerifyCode, verify } = require('@/modules/utils/verifyUtils.js')

let startVerify = async session_id => {
    let session_info = await getSessionInfo(session_id)
    let verifySession = await getVerifyMethods(session_info.stu_id)
    await setVerifySession({ id: session_id, session_str: verifySession.session_str })
    return {
        status: 200,
        data: {
            phone_number: verifySession.phone_number,
            email: verifySession.email
        }
    }
}

let sendCode = async (session_id, type) => {
    let session_info = await getSessionInfo(session_id)
    let sendResult = await sendVerifyCode({ 
        stu_id: session_info.stu_id,
        session_str: session_info.verify_session,
        type: type
    })
    if (sendResult) {
        return {
            status: 200,
            message: "验证码发送成功"
        }
    }
    else {
        return {
            status: 400,
            message: "验证码发送失败"
        }
    }
}

let verifyCode = async (session_id, code, type) => {
    let session_info = await getSessionInfo(session_id)
    let verifyResult = await verify({
        stu_id: session_info.stu_id,
        session_str: session_info.verify_session,
        verify_code: code,
        type: type,
    })

    if (verifyResult) {
        await setVerified(session_id)
        return {
            status: 200,
            message: "验证码验证成功"
        }
    }
    return {
        status: 400,
        message: "验证码验证失败"
    }
}

module.exports = {
    startVerify,
    sendCode,
    verifyCode
}