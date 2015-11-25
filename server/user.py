from google.appengine.ext import ndb
import server.device

class User(ndb.Model):
    id = ndb.StringProperty(indexed=False)
    name = ndb.StringProperty(indexed=False)
    surnames = ndb.StringProperty(indexed=False)
    birthDate =ndb.DateTimeProperty(indexed=False)
    devices = ndb.StructuredProperty(server.device.Device, repeated=True)

def AllUser():
    return User.query()

def UpdateUser(id, name, surnames, birthDate, devices):
  user = User(id=id, name=name, surnames=surnames, birthDate=birthDate, devices=devices)
  user.put()
  return user