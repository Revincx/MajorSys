const mysql = require('mysql')
const getConnection = require('./connection.js')

let addSession = async ({ stu_id, stu_name, gpa_value }) => {
    const INSERT_NEW_SESSION = "INSERT INTO session(stu_id,stu_name,gpa_value) VALUES(?,?,?)"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(INSERT_NEW_SESSION, [stu_id, stu_name, gpa_value])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result.insertId)
        })
    })
}

let setVerifySession = async ({ id, session_str }) => {
    id = parseInt(id)
    const UPDATE_VERIFY_SESSION = "UPDATE session SET verify_session = ? WHERE id = ?"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(UPDATE_VERIFY_SESSION, [session_str, id])
        conn.query(sql, (err) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

let getVerifySession = async id => {
    id = parseInt(id)
    const SELECT_VERIFY_SESSION = "SELECT verify_session FROM session WHERE id = ?"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(SELECT_VERIFY_SESSION, [id])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result[0].verify_session)
        })
    })
}

let setVerified = async id => {
    id = parseInt(id)
    const UPDATE_SESSION_VERIFIED = "UPDATE session SET verified = 1 WHERE id = ?"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(UPDATE_SESSION_VERIFIED, [id])
        conn.query(sql, (err) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

let getSessionInfo = async session_id => {
    const SELECT_SESSION_INFO = "SELECT stu_id,stu_name,gpa_value,verify_session,verified FROM session WHERE id = ?"
    let conn = await getConnection()
    return new Promise((resolve, reject) => {
        let sql = mysql.format(SELECT_SESSION_INFO, [session_id])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            if(!result || result.length == 0){
                resolve(undefined)
                return
            }
            resolve(result[0])
        })
    })
}

module.exports = {
    addSession,
    setVerifySession,
    getVerifySession,
    setVerified,
    getSessionInfo
}