import logging
import json
import webapp2
from authomatic import Authomatic
from authomatic.adapters import Webapp2Adapter
from google.appengine.api import users

from config import CONFIG

# Instantiate Authomatic.
authomatic = Authomatic(config=CONFIG, secret='some random secret string')

def AsUser(user):
	logging.info(user)
	return { 'id': user.user_id(), 'email' : user.email() }

def SendJson(request, r):
    request.response.headers['content-type'] = 'text/plain'
    request.response.write(json.dumps(r))

# Create a simple request handler for the login procedure.
class Login(webapp2.RequestHandler):
	
    # The handler must accept GET and POST http methods and
    # Accept any HTTP method and catch the "provider_name" URL variable.
    def any(self, provider_name):
                
        # It all begins with login.
        result = authomatic.login(Webapp2Adapter(self), provider_name)
        
        # Do not write anything to the response if there is no result!
        if result:
            
            if result.error:
                # Login procedure finished with an error.
                self.response.write(u'<h2>Damn that error: {}</h2>'.format(result.error.message))
            
            elif result.user:
                # OAuth 2.0 and OAuth 1.0a provide only limited user data on login,
                # We need to update the user to get more info.
                if not (result.user.name and result.user.id):
                    result.user.update()
                logging.info(result.user.name)
            	self.redirect("/user/edit");

    # The handler must accept GET and POST http methods and
    # Accept any HTTP method and catch the "provider_name" URL variable.
    def get(self):
        
        user = users.get_current_user()

        if user:
            logging.info('Authentication successful.')
            logging.info('Creating user.')
            r = AsUser(user)
            SendJson(self, r)
                
        #===============================================================
        # We're done
        #===============================================================
        else:
            self.response.set_status(404)
            self.response.write('Oops! I could swear this page was here!')            