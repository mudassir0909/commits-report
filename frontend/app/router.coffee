App = require("app")
App.Router.map( ->
  this.route 'index', { path: '/'}
  this.route 'home', { path: '/home'}
  this.route 'dashboard', { path: '/dashboard'}
)