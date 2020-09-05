from flask_restful import Resource, reqparse
from database.models import Hospital
from flask_jwt_simple import jwt_required, get_jwt
import math


def format_data(data):
    return data.get_obj()


class HospitalController(Resource):
    @jwt_required
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=1)
        parser.add_argument('district', type=str, default="")
        parser.add_argument('state', type=str, default="")
        parser.add_argument('pincode', type=int)
        parser.add_argument('maxResults', type=int, default=10)
        query_param = parser.parse_args()
        page = query_param['page']
        district = query_param['district']
        state = query_param['state']
        pincode = query_param['pincode']
        max_results = query_param['maxResults']
        if max_results < 1:
            max_results = 1
        if pincode is None:
            total_records = Hospital.objects(district__icontains=district, state__icontains=state).count()
            total_pages = math.ceil(total_records / max_results)
            if total_pages == 0:
                return {
                    "success": False,
                    "message": "No data found"
                }
            if page > total_pages:
                return {
                    'success': False,
                    'message': 'Page Number exceeds Max Pages'
                }
            else:
                data = Hospital.objects(district__icontains=district, state__icontains=state)[(page - 1) * max_results:(page) * max_results]
                return {
                    'success': True,
                    "page": page,
                    "totalPages": total_pages,
                    "totalRecords": total_records,
                    "data": list(map(format_data, data))
                }
        else:
            pin_upper = pincode + 12
            pin_lower = pincode - 12
            total_records = Hospital.objects(district__icontains=district, state__icontains=state,
                                             pincode__gt=pin_lower, pincode__lt=pin_upper).count()
            total_pages = math.ceil(total_records / max_results)
            if total_pages == 0:
                return {
                    "success": False,
                    "message": "No data found"
                }
            if page > total_pages:
                return {
                    'success': False,
                    'message': 'Page Number exceeds Max Pages'
                }
            else:
                data = Hospital.objects(district__icontains=district, state__icontains=state, pincode__gt=pin_lower,
                                        pincode__lt=pin_upper)[(page - 1) * max_results:(page) * max_results]
                return {
                    'success': True,
                    "page": page,
                    "totalPages": total_pages,
                    "totalRecords": total_records,
                    "data": list(map(format_data, data))
                }

    @jwt_required
    def post(self):
        try:
            jwt = get_jwt()
            user = jwt.get('sub')
            if user.get('type', "") != "super":
                return {"success": False, "message": "Unauthorized"}
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str)
            parser.add_argument('address', type=str)
            parser.add_argument('latitude', type=float)
            parser.add_argument('longitude', type=float)
            parser.add_argument('pincode', type=int)
            parser.add_argument('state', type=str)
            parser.add_argument('district', type=str)
            parser.add_argument('mobile', type=str)
            parser.add_argument('landline', type=str, default="NA")
            parser.add_argument('emergency', type=str, default="NA")
            q = parser.parse_args()
            if q.name is None or q.address is None or q.latitude is None or q.longitude is None \
                    or q.pincode is None or q.state is None or q.district is None or q.mobile is None:
                return {
                    "success": False,
                    "message": "Name, Address, Latitutde, Longitude, pincode, state, district and mobile are required"}
            else:
                location = "{},{}".format(str(q.latitude), str(q.longitude))
                hospital = Hospital(name=q.name, address=q.address, location=location, pincode=q.pincode,
                                    state=q.state, district=q.district, mobile=q.mobile, landline=q.landline,
                                    emergency=q.emergency)
                hospital.save()
                return {
                    "success": True,
                    "hospital": hospital.get_obj()
                }
        except Exception as e:
            return {"success": False, "message": "Something went wrong"}

