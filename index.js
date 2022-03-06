/* eslint-disable node/no-path-concat */
const express = require('express')
const https = require('https')
const fs = require('fs')
const { I18n } = require('i18n')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

if (process.env.NODE_ENV === 'development') {
  app.use('/components', express.static(__dirname + '/components'))
  app.use('/scripts', express.static(__dirname + '/scripts'))
  app.use('/styles', express.static(__dirname + '/styles'))
  app.use('/views', express.static(__dirname + '/views'))
}
app.use('/public', express.static(__dirname + '/public'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/dist', express.static(__dirname + '/dist'))

const i18n = new I18n({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales')
})
app.use((req, res, next) => {
  i18n.init(req, res)
  next()
})

app.locals.NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.render('index', { id: 'home', title: 'Home' })
})
app.get('/privacy', (req, res) => {
  res.render('privacy/privacy', { id: 'privacy', title: 'Privacy' })
})
app.get('/contatti', (req, res) => {
  res.render('contatti/contatti', { id: 'contacts', title: 'Contatti' })
})
app.get('*', function (req, res) {
  res.render('404/404', { id: 'err404', title: 'Error 404' })
})

const options = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.cert')
}

https.createServer(options, app).listen(PORT, () => {
  console.log(`App is running on port ${PORT} over HTTPS.`)
})

/* app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`)
}) */
