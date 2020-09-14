const express = require('express')

const app = express()
app.use(express.static('build', { maxage: 1000 * 3600 }))
app.listen(3000)
