App = require("app")

DS.RESTAdapter.configure "plurals", { repository: 'repositories'}

App.Store = DS.Store.extend
  revision: 11