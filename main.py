import logging
import json
import webapp2
from webapp2_extras import config as webapp2_config


import server.login
import server.user
import server.device

from rest_gae import *
from rest_gae.users import UserRESTHandler

# Create routes.
ROUTES = [webapp2.Route(r'/api/logged', server.login.Login, handler_method='get'),
          webapp2.Route(r'/api/login/<:.*>', server.login.Login, handler_method='any'),
          RESTHandler(
            '/api/device', # The base URL for this model's endpoints
            server.device.Device, # The model to wrap
            permissions={
              'GET': PERMISSION_OWNER_USER,
              'POST': PERMISSION_OWNER_USER,
              'PUT': PERMISSION_OWNER_USER,
              'DELETE': PERMISSION_OWNER_USER
            },
            # Will be called for every PUT, right before the model is saved (also supports callbacks for GET/POST/DELETE)
            put_callback=lambda model, data: model
          ),
          # Optional REST API for user management
    UserRESTHandler(
        '/api/users',
        user_model=server.user.User, # You can extend it with your own custom user class
        user_details_permission=PERMISSION_OWNER_USER,
        email_as_username=True,
        verify_email_address=True,
        verification_email={
            'sender': 'Xentinels <xentineles@appspot.gserviceaccount.com>',
            'subject': 'Verify your email address',
            'body_text': 'Click here {{ user.full_name }}: {{ verification_url }}',
            'body_html': '<a href="{{ verification_url }}">Click here</a> {{ user.full_name }}'
            },
        verification_successful_url='/verification_successful',
        verification_failed_url='/verification_failed',
        reset_password_url='/reset_password',
        reset_password_email={
            'sender': 'Xentinels <xentineles@appspot.gserviceaccount.com>',
            'subject': 'Please reset your password',
            'body_text': 'Reset here: {{ verification_url }}',
            'body_html': '<a href="{{ verification_url }}">Click here</a> to reset'
            },
        )
          ]

# Make sure we initialize our WSGIApplication with this config (used for initializing webapp2_extras.sessions)
config = {}
config['webapp2_extras.sessions'] = {
    'secret_key': 'my-super-secret-key'
}

# Instantiate the webapp2 WSGI application.
APP = webapp2.WSGIApplication(ROUTES, debug=True, config=config)