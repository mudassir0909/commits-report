App.Repository = DS.Model.extend
  name: DS.attr('string')

App.GithubLogin = DS.Model.extend
  responseCode: DS.attr('boolean')