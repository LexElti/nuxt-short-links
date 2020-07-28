const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes')
const linksRoutes = require('./routes/links.routes')
const redirectRoutes = require('./routes/redirect.routes')
const keys = require('./keys')
const app = express()

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json({extended: true}))

app.use('/api/auth', authRoutes)
app.use('/api/link', linksRoutes)
app.use('/t', redirectRoutes)

module.exports = app
