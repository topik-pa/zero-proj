module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { id: 'home', title: 'Home' })
  })
  app.get('/privacy', (req, res) => {
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy' })
  })
  app.get('/contatti', (req, res) => {
    res.render('contatti/contatti', { id: 'contacts', title: 'Contatti' })
  })
}
