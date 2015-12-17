import webapp2
import server.routing


# Instantiate the webapp2 WSGI application.
APP = webapp2.WSGIApplication(server.routing.ROUTES, debug=True, config={
    'webapp2_extras.sessions': {'secret_key': 'my-super-secret-key'}
})
