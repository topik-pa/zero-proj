/* eslint-disable node/no-path-concat */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/public', express.static(__dirname + '/public'))
app.use('/components', express.static(__dirname + '/components'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.use('/styles', express.static(__dirname + '/styles'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/views', express.static(__dirname + '/views'))
app.use('/dist', express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.render('index', { NODE_ENV: process.env.NODE_ENV, id: 'home', title: 'Home' })
})
app.get('/privacy', (req, res) => {
  res.render('privacy/privacy', { NODE_ENV: process.env.NODE_ENV, id: 'privacy', title: 'Privacy' })
})
app.get('/contatti', (req, res) => {
  res.render('contatti/contatti', { NODE_ENV: process.env.NODE_ENV, id: 'contacts', title: 'Contatti' })
})
app.get('*', function (req, res) {
  res.render('404/404', { NODE_ENV: process.env.NODE_ENV, id: 'err404', title: 'Error 404' })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`)
})
