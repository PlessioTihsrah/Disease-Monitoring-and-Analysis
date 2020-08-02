from flask_bcrypt import Bcrypt
from flask_restful import Resource, reqparse
from database.models import User
from flask_jwt_simple import (
    JWTManager, create_jwt
)
from mongoengine import ValidationError
import datetime
bcrypt = None
jwt = None
def initialise_auth(app):
    global bcrypt, jwt
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)


class Login(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email or password is missing"
                }
            else:
                try:
                    user = User.objects.get(email=q.email)
                    valid = bcrypt.check_password_hash(user.password, q.password)
                    print(q.password, user.password, valid)
                    if (valid):
                        return {
                            "success": True,
                            "token": create_jwt(user.email),
                            "user": user.format()
                        }
                    else:
                        return {
                            "success": False,
                            "message": "Invalid Credentials"
                        }
                except Exception as e:
                    print(e)
                    return {
                        "success": False,
                        "message": "Invalid Credentials"
                    }
        except Exception as e:
            print(e)

class Signup(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            parser.add_argument("name", type= str)
            parser.add_argument("dob", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None or q.name is None or q.dob is None:
                return {
                    "success": False,
                    "message": "Email, password, name or date of birth is missing"
                }
            else:
                user_count = User.objects(email=q.email).count()
                if user_count > 0:
                    return {
                        "success": False,
                        "message": "User already exists"
                    }
                else:
                    password = bcrypt.generate_password_hash(q.password)
                    dob = datetime.datetime.strptime(q.dob, '%d/%m/%Y')
                    user = User(email=q.email, password=password, name=q.name, dob=dob)
                    user.save()
                    return {
                        "success": True,
                        "token": create_jwt(user.email),
                        "user": user.format()
                    }
        except ValidationError as e:
            errors = list(e.to_dict())
            message = "Invalid "+ ", ".join(errors)
            return {
                "success": False,
                "message": message
            }
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong"
            }



