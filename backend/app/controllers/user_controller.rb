class UserController < ApplicationController
  def organizations
    #client.orgs
  end

  def repositories
    # client.repos
    render :json => {repositories: [{name: "ember-metro"}]}
  end

  def github_login
    login = params[:username]
    password = params[:password]
    client = Octokit::Client.new
    # status = client.validate_credentials({:login => login, :password => password})
    render :json => {github_logins: {status: true}}
  end
end