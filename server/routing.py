import login
import user
import device
import webapp2
from rest_gae import *
from rest_gae.users import UserRESTHandler

ROUTE_PATTERN = [

    "/api/users",
    "/api/device",
    r"/api/logged",
    r"/api/login/<:.*>"

]


def UserHandler():
  # Optional REST API for user management
    return UserRESTHandler(
        ROUTE_PATTERN[0],
        # You can extend it with your own custom user class
        user_model=user.User,
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
        }
    )


def DeviceHandler():
    return RESTHandler(
        ROUTE_PATTERN[1],  # The base URL for this model's endpoints
        device.Device,  # The model to wrap
        permissions={
            'GET': PERMISSION_OWNER_USER,
            'POST': PERMISSION_OWNER_USER,
            'PUT': PERMISSION_OWNER_USER,
            'DELETE': PERMISSION_OWNER_USER
        },
        # Will be called for every PUT, right before the model is saved (also
        # supports callbacks for GET/POST/DELETE)
        put_callback=lambda model, data: model
    )


def LoggedHandler():
    return webapp2.Route(ROUTE_PATTERN[2], login.Login, handler_method='get')


def LoginHandler():
    return webapp2.Route(ROUTE_PATTERN[3], login.Login, handler_method='any')


# Create routes.
ROUTES = [

    LoginHandler(),
    LoggedHandler(),
    DeviceHandler(),
    UserHandler()

]
