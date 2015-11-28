import json
import webapp2
import time

from google.appengine.api import users

import server.user
import server.device
import logging
import server.login


def AsDict(user):
  return { 'id': user.key.id(), 'name' : user.name, 'surnames' : user.surnames, 'birthDate' : user.birthDate }


class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    #time.sleep(1)
    super(RestHandler, self).dispatch()


  def SendJson(self, r):
    self.response.headers['content-type'] = 'text/plain'
    self.response.write(json.dumps(r))
    

class QueryUserHandler(RestHandler):

  def get(self):
    users = server.user.AllUsers()
    r = [ AsDict(user) for user in users ]
    self.SendJson(r)

class UpdateUserHandler(RestHandler):

  def post(self):
    r = json.loads(self.request.body)
    user = server.user.UpdateUser(r['id'], r['name'], r.get('surnames', None), r.get('birthDate', None))
    r = AsDict(user)
    self.SendJson(r)

# Create routes.
ROUTES = [('/api/user', UpdateUserHandler),
          ('/api/users', QueryUserHandler),
          webapp2.Route(r'/api/logged', server.login.Login, handler_method='get'),
          webapp2.Route(r'/api/login/<:.*>', server.login.Login, handler_method='any')]

# Instantiate the webapp2 WSGI application.
APP = webapp2.WSGIApplication(ROUTES, debug=True)