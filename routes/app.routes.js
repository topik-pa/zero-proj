module.exports = app => {
  app.get('/', (req, res) => {
    res.render('home', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/users', (req, res) => {
    const breadcrumbs = [
      {
        name: 'Users'
      }
    ]
    res.render('users/users', { id: 'users', title: 'Users', url: req.url, breadcrumbs })
  })
  app.get('/form', (req, res) => {
    const breadcrumbs = [
      {
        name: 'Form'
      }
    ]
    res.render('form/form', { id: 'form', title: 'Form', url: req.url, breadcrumbs })
  })
  app.get('/plp', (req, res) => {
    const breadcrumbs = [
      {
        name: 'PLP'
      }
    ]
    res.render('plp/plp', { id: 'plp', title: 'Product Listing Page', url: req.url, breadcrumbs })
  })
  app.get('/contacts', (req, res) => {
    const breadcrumbs = [
      {
        name: 'Contacts'
      }
    ]
    res.render('contacts/contacts', { id: 'contacts', title: 'Contacts', url: req.url, breadcrumbs })
  })
  app.get('/privacy', (req, res) => {
    const breadcrumbs = [
      {
        name: 'Privacy'
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy', url: req.url, breadcrumbs })
  })
}
