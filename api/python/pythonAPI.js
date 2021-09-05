const spawn = require('child_process').spawn

let getStuInfo = async (stu_id, pass) => {
    let pythonRes = spawn('python', ['python/api.py', stu_id, pass])
    return new Promise(resolve => {
        pythonRes.stdout.on('data', data => {
            let res = JSON.parse(data.toString())
            resolve(res)
        })
        pythonRes.stderr.on('data', (data) => {
            console.log(data.toString());
            resolve(undefined)
        })
    })
}

module.exports = {
    getStuInfo
}