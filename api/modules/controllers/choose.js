const { getAllColleges, getMajor } = require('@/modules/database/major.js')
const { addChoice, getMyChoice,getChoicesByMajor } = require('@/modules/database/choice.js')
const { getSessionInfo } = require('@/modules/database/session.js')
// 截止时间戳
const ENDDING_TIMESTAMP = 1630296000000


let submitChoice = async (session_id, major_choice) => {
    if(Date.now() > ENDDING_TIMESTAMP)
    {
        return {
            status: 400,
            message: "模拟填报已经截止!"
        }
    }
    let session_info = await getSessionInfo(session_id)
    let hasChosen = await getMyChoice(session_info.stu_id)
    if (hasChosen) {
        return {
            status: 400,
            message: "您已经进行过一次模拟填报，不能重复进行，如有问题请与管理员联系"
        }
    }
    if(session_info.stu_id.slice(0,4) != '2020')
    {
        return {
            status: 400,
            message: "仅允许2020级学生进行填报！"
        }
    }
    if ((!session_info.verified) || session_info.verified == '0') {
        return {
            status: 400,
            message: "你还没有完成验证"
        }
    }
    try {
        let addResult = await addChoice({
            session_id: session_id,
            major_id: major_choice
        })
        if (addResult) {
            return {
                status: 200,
                message: "success"
            }
        }
        return {
            status: 400,
            message: "提交失败"
        }

    }
    catch (err) {
        console.log("提交选择失败")
        console.log(err)
        return {
            status: 400,
            message: "提交失败"
        }
    }
}

let getMyChoiceALt = async session_id => {
    let session_info = await getSessionInfo(session_id)
    let myChoice = await getMyChoice(session_info.stu_id)
    if(myChoice){
        return {
            status: 200,
            data: myChoice
        }
    }
    else {
        return {
            status: 400
        }
    }
}


let getChoiceStat = async session_id => {
    
    let session_info = await getSessionInfo(session_id)
    let major_choice = await getMyChoiceALt(session_id)
    let choice_stat = await getChoicesByMajor(major_choice.data.major_choice)
    return {
        status: 200,
        data: choice_stat.map(item => {
            if(item.stu_id != session_info.stu_id)
            {
                item.stu_id = item.stu_id.replace(/(\d{4})\d{5}(\d{3})/,'$1*****$2')
            }
            return item
        })
    }
}

module.exports = {
    submitChoice,
    getAllColleges,
    getMajor,
    getMyChoiceALt,
    getChoiceStat
}