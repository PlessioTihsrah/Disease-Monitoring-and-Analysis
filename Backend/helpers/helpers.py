from flask_jwt_simple import JWTManager
from flask_bcrypt import Bcrypt

bcrypt = None
jwt = None
def initialise_helpers(app):
    global bcrypt, jwt
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

def generate_hash(string):
    global bcrypt
    return bcrypt.generate_password_hash(string)

def check_hash(string, hash):
    global bcrypt
    return bcrypt.check_password_hash(hash, string)