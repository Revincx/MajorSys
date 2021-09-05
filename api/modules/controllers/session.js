const { getStuInfo } = require('@/python/pythonAPI.js')
const { addSession } = require('@/modules/database/session.js')

let createSession = async (stu_id, pass) => {
    let stu_info = await getStuInfo(stu_id, pass)
    if (!stu_info) {
        return {
            status: 400,
            message: "登录失败，请检查学号或密码"
        }
    }
    try{
        let session_id = await addSession({
            stu_id: stu_id,
            stu_name: stu_info.info.real_name,
            gpa_value: stu_info.gpa
        })
        return {
            status: 200,
            session_id: session_id,
            name: stu_info.info.real_name,
            gpa: stu_info.gpa
        }
    }
    catch(err) {
        console.log("添加Session时遇到错误")
        console.log(err)
        return {
            status: 400,
            message: "Session创建失败"
        }
    }
}


module.exports = {
    createSession
}