import json
import webapp2
import time

import server.user
import server.device
import logging

logging.info('Main')

def AsDict(aire):
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
    logging.info("entrando...................")
    r = json.loads(self.request.body)
    user = server.user.UpdateUser()
    r = AsDict(user)
    self.SendJson(r)


APP = webapp2.WSGIApplication([
    ('/api/user', UpdateUserHandler),
    ('/api/users', QueryUserHandler),
    #('/seed', SeedHandler)
    #('/rest/insert', InsertHandler),
    #('/rest/delete', DeleteHandler),
    #('/rest/update', UpdateHandler),
], debug=True)


