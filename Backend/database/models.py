from .db import db
from mongoengine.fields import StringField, EmailField, DateTimeField, ListField, \
    ReferenceField, BooleanField, FloatField, DictField, EmbeddedDocumentField, IntField
from datetime import datetime


class Hospital(db.Document):
    name = StringField(required=True)
    address = StringField(required=True)
    location = StringField(required=True)
    pincode = IntField(required=True)
    landline = StringField()
    state = StringField()
    district = StringField()
    mobile = StringField()
    emergency = StringField()

    def get_obj(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "address": self.address,
            "location": self.location,
            "pincode": self.pincode,
            "landline": self.landline,
            "state": self.state,
            "district": self.district,
            "mobile": self.mobile,
            "emergency": self.emergency
        }


class Doctor(db.Document):
    email = EmailField(required=True)
    hospital = ReferenceField(Hospital, required=True)


class AppointmentDetail(db.EmbeddedDocument):
    date = DateTimeField()
    doctor = StringField()
    fees = FloatField(default=0.0)
    unpaid = FloatField(default=0.0)
    remarks = StringField()
    monitoring = DictField()


class User(db.Document):
    name = StringField(required=True)
    email = EmailField(required=True, primary_key=True)
    password = StringField(required=True)
    dob = DateTimeField(required=True)

    def format(self):
        return {
            "name": self.name,
            "email": self.email,
            "dob": datetime.strftime(self.dob, '%d/%m/%Y'),
        }


class Appointment(db.Document):
    creationDate = DateTimeField(required=True)
    closedDate = DateTimeField()
    nextAppointment = DateTimeField(required=True)
    hospital = ReferenceField(Hospital, required=True)
    patient = ReferenceField(User, required=True)
    closed = BooleanField(default=False)
    appointments = ListField(EmbeddedDocumentField(AppointmentDetail), default=[])

    def format(self):
        return {
            "id": str(self.id),
            "creationDate": datetime.strftime(self.creationDate, '%d/%m/%Y %H:%M'),
            "nextAppointment": datetime.strftime(self.nextAppointment, '%d/%m/%Y %H:%M'),
            "hospital": self.hospital.get_obj(),
            "patient": self.patient.format(),
            "closed": self.closed,
            "appointments": self.appointments

        }
