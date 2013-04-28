App.HomeController = Ember.Controller.extend
  username: null
  password: null
  loginResponse: null
  login: ->
    store = @get('store')
    options = {username: @get('username'), password: @get('password')}
    @set 'loginResponse', store.findQuery(App.GithubLogin, options)