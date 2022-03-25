module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/privacy', (req, res) => {
    const breadcrumbs = [
      {
        name: 'privacy'
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy', url: req.url, breadcrumbs })
  })
  app.get('/contatti', (req, res) => {
    const breadcrumbs = [
      {
        name: 'contacts'
      }
    ]
    res.render('contatti/contatti', { id: 'contacts', title: 'Contacts', url: req.url, breadcrumbs })
  })
}
