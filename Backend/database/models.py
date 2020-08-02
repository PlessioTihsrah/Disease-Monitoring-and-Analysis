from .db import db
from mongoengine.fields import StringField, EmailField, DateTimeField, ListField,\
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


class AppointmentDetail(db.EmbeddedDocument):
    date = DateTimeField()
    doctor = StringField()
    fees = FloatField(default=0.0)
    unpaid = FloatField(default=0.0)
    remarks = StringField()
    monitoring = DictField()


class Appointment(db.Document):
    date = DateTimeField(required=True)
    id = StringField(required=True, primary_key=True)
    hospital = StringField(required=True)
    doctor = ReferenceField(Doctor, required=True)
    closed = BooleanField(default=False)
    appointments = ListField(EmbeddedDocumentField(AppointmentDetail))


class User(db.Document):
    name = StringField(required=True)
    email = EmailField(required=True, primary_key=True)
    password = StringField(required=True)
    dob = DateTimeField(required=True)
    appointments = ListField(ReferenceField(Appointment), default=[])

    def format(self):
        return {
            "name": self.name,
            "email": self.email,
            "dob": datetime.strftime(self.dob, '%d/%m/%Y'),
            "appointments": self.appointments
        }

