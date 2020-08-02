from flask import Flask
from flask_restful import Api
from controllers.hospital import HospitalController
from controllers.auth import Login, Signup, initialise_auth
from controllers.predictor import Predictor
from database.db import initialize_db
from os import getenv

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = getenv("SECRET_KEY")
app.config['MONGODB_SETTINGS'] = {
    'host': getenv("DATABASE_URL")
}
initialize_db(app)
initialise_auth(app)
api = Api(app)
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(HospitalController, '/hospitals')
api.add_resource(Predictor, '/predict')