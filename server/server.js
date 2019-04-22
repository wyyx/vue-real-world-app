const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// use middlewares
app.use(bodyParser.json())

// routes
require('./routes/all.routes')(app)

// static
const staticPath = path.join(__dirname, '..', 'dist')
app.use(express.static(staticPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// start app
const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('server is up on port', PORT)
  }
})
