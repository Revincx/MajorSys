const mysql = require('mysql')

console.log(process.env.DB_PASS);
const conn = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS || '123456',
    database: 'MajorSys'
})

conn.connect(err => {
    if(err) throw err;
    console.log('mysql connncted success!');
  })

let getConnection = async () => {
    return conn
}

module.exports = getConnection