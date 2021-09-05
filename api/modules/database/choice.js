const mysql = require('mysql')
const getConnection = require('./connection.js')
const { getSessionInfo } = require('./session.js')

let addChoice = async ({ session_id, major_id }) => {
    session_id = parseInt(session_id)
    major_id = parseInt(major_id)
    const INSERT_NEW_CHOICE = "INSERT INTO choice (stu_id,stu_name,gpa_value,major_choice) VALUES (?,?,?,?)"
    let conn = await getConnection()

    try {
        let { stu_id, stu_name, gpa_value } = await getSessionInfo(session_id)
        return new Promise((resolve, reject) => {
            let sql = mysql.format(INSERT_NEW_CHOICE, [stu_id, stu_name, gpa_value, major_id])
            conn.query(sql, (err) => {
                if (err) reject(err)
                resolve(true)
            })
        })
    }
    catch (err) {
        console.log("添加选择失败,sessionID:", session_id);
        console.log(err)
        return false
    }
}

let getMyChoice = async stu_id => {
    const SELECT_CHOICE_BY_STU_ID = "SELECT c.major_choice,m.name as major_name FROM choice c,major m WHERE c.major_choice = m.id AND stu_id = ?"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(SELECT_CHOICE_BY_STU_ID, [stu_id])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result.length === 0 ? false : result[0])
        })
    })
}

let getChoicesByMajor = async major_id => {
    const SELECT_CHOICES_BY_MAJOR = "SELECT c.stu_id,c.gpa_value,m.name as major_name FROM choice c,major m WHERE major_choice = ? and c.major_choice=m.id ORDER BY gpa_value DESC"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(SELECT_CHOICES_BY_MAJOR, [major_id])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = { 
    addChoice,
    getMyChoice,
    getChoicesByMajor }