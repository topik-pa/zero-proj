module.exports = app => {
  app.get('/', (req, res) => {
    res.render('home', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/users', (req, res) => {
    const breadcrumbs = [
      {
        name: 'users'
      }
    ]
    res.render('users/users', { id: 'users', title: 'Users', url: req.url, breadcrumbs })
  })
  app.get('/privacy', (req, res) => {
    const breadcrumbs = [
      {
        name: 'privacy'
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy', url: req.url, breadcrumbs })
  })
}
