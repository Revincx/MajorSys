const axios = require('axios')
const { auth_url } = require('@/config.json')

const axiosInstance = axios.create({
    baseURL: `${auth_url}/authentication/`,
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        'origin': auth_url,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'referer': `${auth_url}/authentication/authentication/views/userinfo/findpassword.html`
    }
})

let getVerifyMethods = async stu_id => {
    let data = new URLSearchParams()
    data.append('memberUsername', stu_id)
    let resp = await axiosInstance.post('/user/getUserInfoByMemberId', data)
    return {
        session_str: resp.headers['set-cookie'][0].split(';')[0],
        phone_number: resp.data.obj['memberPhone'],
        email: resp.data.obj['memberMailbox']
    }
}

let sendVerifyCode = async ({ stu_id, session_str, type }) => {
    let data = new URLSearchParams()
    data.append('dlm', stu_id)
    data.append('type', type)
    let resp = await axiosInstance.post('/verification/sendVerification', data, {
        headers: {
            'cookie': session_str
        }
    })
    return resp.data.success
}

let verify = async ({ stu_id, session_str, verify_code,type }) => {
    let data = new URLSearchParams()
    data.append('userName',stu_id)
    data.append('verificationCode',verify_code)
    data.append('type',type)
    let resp = await axiosInstance.post('/verification/verification',data,{
        headers: {
            'cookie': session_str
        }
    })
    return resp.data.success
}

module.exports = {
    getVerifyMethods,
    sendVerifyCode,
    verify
}