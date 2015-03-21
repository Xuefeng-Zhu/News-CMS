from flask import abort
from flask.ext.restful import Resource, reqparse
from model import redis_store
from model.user import User
from mongoengine.errors import NotUniqueError, ValidationError
from util.userAuth import auth_required
import requests


userParser = reqparse.RequestParser()
userParser.add_argument('email', type=str)
userParser.add_argument('password', type=str)


class UserAPI(Resource):

    def post(self):
        args = userParser.parse_args()
        email = args['email']
        password = args['password']
        if email is None or password is None:
            abort(400)

        user = User(email=email, is_activated=True)
        user.hash_password(password)
        try:
            user.save()
        except ValidationError, e:
            return {'status': 'error', 'message': e.message}
        except NotUniqueError, e:
            return {'status': 'error', 'message': e.message}

        token = user.generate_auth_token(expiration=360000)

        return ({'status': 'success', 'message':
                 'Please check your email to activate your account.'}, 201)


class LoginAPI(Resource):

    def options(self):
        pass
    # renew token by using old valid token

    @auth_required
    def get(self, user_id):
        user = User.objects(id=user_id).first()
        token = user.generate_auth_token(expiration=360000)
        redis_store.set(user_id, token)
        return {'token': token}

    def post(self):
        args = userParser.parse_args()
        email = args['email']
        password = args['password']
        if email is None or password is None:
            abort(400)

        user = User.objects(email=email).first()

        if not user or not user.verify_password(password):
            return {'status': 'error', 'message':
                    'The email does not exist or password is wrong'}
        if not user.is_activated:
            return {'status': 'error', 'message':
                    'The account has not been activated'}

        token = user.generate_auth_token(expiration=360000)
        redis_store.set(str(user.id), token)
        return {'token': token}


