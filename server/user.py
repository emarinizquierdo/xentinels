import server.device
from rest_gae import *
from rest_gae.users import User
from google.appengine.ext import ndb

class User(User):
  name = ndb.StringProperty(indexed=False)
  surnames = ndb.StringProperty(indexed=False)
  birthDate =ndb.DateTimeProperty(indexed=False)
  devices = ndb.StructuredProperty(server.device.Device, repeated=True)
  is_admin = ndb.BooleanProperty(default=False)

  class RESTMeta:
        # This is how rest_gae knows if a user is an admin or not
        admin_property = 'is_admin'