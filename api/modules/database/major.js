const mysql = require('mysql')
const getConnection = require('./connection.js')

let getAllColleges = async () => {
    let conn = await getConnection()
    const SELECT_ALL_COLLEGES = "select id,name FROM college"
    return new Promise((resolve, reject) => {
        conn.query(SELECT_ALL_COLLEGES, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

let getMajor = async college_id => {
    let conn = await getConnection()
    const SELECT_MAJOR_BY_COLLEGE_ID = "select id,name FROM major where college_id = ?"
    return new Promise((resolve, reject) => {
        let sql = mysql.format(SELECT_MAJOR_BY_COLLEGE_ID, [college_id])
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    getAllColleges,
    getMajor
}