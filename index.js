const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/scripts', express.static(__dirname + '/scripts'))
app.use('/styles', express.static(__dirname + '/styles'))

app.get('/', (req, res) => {
  res.render('index', { title: 'Marco' })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})