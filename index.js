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

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})
app.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Privacy' })
})
app.get('/contatti', (req, res) => {
  res.render('contatti', { title: 'Contatti' })
})
app.get('*', function(req, res){
  res.render('404', { title: 'Error 404' })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})