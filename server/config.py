# config.py

from authomatic.providers import oauth2, oauth1, openid, gaeopenid

CONFIG = {
    
    'tw': { # Your internal provider name
           
        # Provider class
        'class_': oauth1.Twitter,
        
        # Twitter is an AuthorizationProvider so we need to set several other properties too:
        'consumer_key': '########################',
        'consumer_secret': '########################',
    },
    
    'fb': {
           
        'class_': oauth2.Facebook,
        
        # Facebook is an AuthorizationProvider too.
        'consumer_key': '########################',
        'consumer_secret': '########################',
        
        # But it is also an OAuth 2.0 provider and it needs scope.
        'scope': ['user_about_me', 'email', 'publish_stream', 'read_stream'],
    },
    
    'gae_oi': {
           
        # OpenID provider based on Google App Engine Users API.
        # Works only on GAE and returns only the id and email of a user.
        # Moreover, the id is not available in the development environment!
        'class_': gaeopenid.GAEOpenID,
    },
    
    'oi': {
           
        # OpenID provider based on the python-openid library.
        # Works everywhere, is flexible, but requires more resources.
        'class_': openid.OpenID,
    },

    'google': {
         'class_': 'authomatic.providers.oauth2.Google', # Can be a fully qualified string path.

         # Provider type specific keyword arguments:
         'short_name': 2, # use authomatic.short_name() to generate this automatically
         'consumer_key': '411928483544-v9sehvmcv3sfib7teb0ja7it2hg0nekg.apps.googleusercontent.com',
         'consumer_secret': 'KgPpJJ_xcYAYdNYIMQOElk7F',
         'scope': ['https://www.googleapis.com/auth/userinfo.profile',
                   'https://www.googleapis.com/auth/userinfo.email']
    }
}