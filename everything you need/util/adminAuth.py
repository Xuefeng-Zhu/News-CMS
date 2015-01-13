from flask import abort, current_app, request
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from functools import wraps


def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers['token']
        if token is None:
            abort(401)

        s = Serializer(current_app.config.get('SECRET_KEY'))
        try:
            s.loads(token)
        except SignatureExpired:
            abort(401)    # valid token, but expired
        except BadSignature:
            abort(401)    # invalid token

        # if redis_store.get(user_id) == token:
            # kwargs['user_id'] = user_id
        return f(*args, **kwargs)

    return decorated_function
