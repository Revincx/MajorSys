const _ = require('module-alias/register')
const __ = require('dotenv').config()
const app = require('./routes/index.js')

const PORT = process.env.PORT || 5001

app.listen(PORT)

console.log(`Server is listening on http://localhost:${PORT}`)