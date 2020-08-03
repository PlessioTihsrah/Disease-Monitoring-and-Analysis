from flask_restful import Resource, reqparse
from flask_jwt_simple import jwt_required, get_jwt
from database.models import Appointment, User
from datetime import datetime
from math import ceil


class AppointmentCreate(Resource):
    @jwt_required
    def get(self):
        jwt = get_jwt()
        user = jwt.get('sub')
        exists = User.objects(email=user)
        if not exists:
            return {
                "success": False,
                "message": "No user exists"
            }
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=1)
        params = parser.parse_args()
        page = params.page
        total_appointments = Appointment.objects(patient=user).count()
        appointments = Appointment.objects(patient=user).order_by('-nextAppointment')[(page - 1) * 10: page * 10]
        return {
            "success": True,
            "totalAppointments": total_appointments,
            "totalPages": ceil(total_appointments / 10),
            "page": page,
            "appointments": [appointment.format() for appointment in appointments]
        }

    @jwt_required
    def post(self):
        jwt = get_jwt()
        user = jwt.get('sub')
        exists = User.objects(email=user)
        if not exists:
            return {
                "success": False,
                "message": "No user exists"
            }
        parser = reqparse.RequestParser()
        parser.add_argument('hospital', type=str)
        parser.add_argument('date', type=str)
        body = parser.parse_args()
        if not (body.hospital and body.date):
            return {
                "success": False,
                "message": "Hospital or date missing"
            }
        else:
            creation_date = datetime.now()
            next_appointment = datetime.strptime(body.date, '%d/%m/%Y %H:%M')
            appointment = Appointment(hospital=body.hospital, creationDate=creation_date,
                                      nextAppointment=next_appointment, patient=user)
            appointment.save()
            print(appointment.format())
            return {
                'success': True,
                'appointment': appointment.format()
            }
