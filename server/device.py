from google.appengine.ext import ndb

class Device(ndb.Model):
    id = ndb.StringProperty(indexed=False)
    name = ndb.StringProperty(indexed=False)
    status = ndb.BooleanProperty(indexed=False)

def AllDevice():
    return Device.query()

def UpdateDevice(id, name, status):
  device = Device(id=id, status=status)
  device.put()
  return device

def InsertUser(id, name, status):
  device = Device(id=id, status=status)
  device.put()
  return device