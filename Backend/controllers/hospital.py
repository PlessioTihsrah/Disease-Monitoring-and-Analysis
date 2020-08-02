from flask_restful import Resource, reqparse
from database.models import Hospital
import math


def format_data(data):
    return data.get_obj()

class HospitalController(Resource):
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
                data = Hospital.objects(district__icontains=district, state__icontains=state)[(page - 1) * max_results:(page + 1) * max_results]
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
                                        pincode__lt=pin_upper)[(page - 1) * max_results:(page + 1) * max_results]
                return {
                    'success': True,
                    "page": page,
                    "totalPages": total_pages,
                    "totalRecords": total_records,
                    "data": list(map(format_data, data))
                }
