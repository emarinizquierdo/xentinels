from rest_gae import *
from rest_gae.users import User
from google.appengine.ext import ndb

class Device(ndb.Model):
    id = ndb.StringProperty()
    name = ndb.StringProperty(indexed=False)
    status = ndb.BooleanProperty(indexed=False)
    owner = ndb.KeyProperty(kind='User')

    class RESTMeta:
      user_owner_property = 'owner' # When a new instance is created, this property will be set to the logged-in user