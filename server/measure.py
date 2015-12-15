from rest_gae import *
from rest_gae.users import User
from google.appengine.ext import ndb


class Measure(ndb.Model):
    measureId = ndb.StringProperty()
    date = ndb.DateTimeProperty(indexed=False)
    lat = ndb.FloatProperty(indexed=False)
    lng = ndb.FloatProperty(indexed=False)
    pollutant1 = ndb.FloatProperty(indexed=False)
    pollutant2 = ndb.FloatProperty(indexed=False)
    pollutant3 = ndb.FloatProperty(indexed=False)
    pollutant4 = ndb.FloatProperty(indexed=False)
    owner = ndb.KeyProperty(kind='User')

    class RESTMeta:
        # When a new instance is created, this property will be set to the
        # logged-in user
        user_owner_property = 'owner'
