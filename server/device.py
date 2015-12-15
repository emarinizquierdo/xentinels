from rest_gae import *
from rest_gae.users import User
from google.appengine.ext import ndb


class Device(ndb.Model):
    deviceId = ndb.StringProperty()
    name = ndb.StringProperty(indexed=False)
    description = ndb.StringProperty(indexed=False)
    status = ndb.BooleanProperty(indexed=False)
    lat = ndb.FloatProperty(indexed=False)
    lng = ndb.FloatProperty(indexed=False)
    owner = ndb.KeyProperty(kind='User')

    class RESTMeta:
        # When a new instance is created, this property will be set to the
        # logged-in user
        user_owner_property = 'owner'
