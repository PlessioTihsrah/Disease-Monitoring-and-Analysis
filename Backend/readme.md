## Endpoints
Note: Some endpoints are protected by JWT. To use authentication, send token in Authorization Header as Bearer

###Overview

#### Authentication Routes
POST /login: To Login

POST /signup: To Signup

#### Hospital Routes (JWT Required)
GET /hospitals: Get list of hospitals
#### Prediction Routes (JWT Required)
GET /predict: Get prediction for disease
#### Appointment Routes (JWT Required)
GET /appointments: Get all appointments made by user

POST /appointments: Create new appointment

### Detailed Guide

#### POST /login
Used to login

Request Params: None

Request Body:
1. email: string, mandatory
2. password: string, mandatory

Response: JSON Response containing fields
1. success: Boolean representing whether authentication was successful or not
2. message: Present only when success is false. Shows message regarding failure
3. token: JWT for further authentication
4. user : JSON Object containing details of user. It has following fields
    1. name: Name of user
    2. email: Email of user
    3. dob: Date of birth of user

##### Sample Request
Body:

    { "email" : "test@test.com", "password": "test" }
    
Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "user": {
            "name": "Test User",
            "email": "test@test.com",
            "dob": "31/01/1990"
        }
    }

Response (failure):

    {
        "success": false,
        "message": "Invalid Credentials"
    }

#### POST /signup
Used to create new account (for patients)

Request Params: None

Request Body:
1. email: string, unique and mandatory
2. password: string, mandatory
3. dob: string, format dd/mm/yyyy only. Mandatory
4. name: string, mandatory

Response: Same JSON Object as login

##### Sample Request
Body: 
    
    {
	    "email": "test@test.com",
	    "password": "test",
	    "dob": "31/01/1990",
	    "name": "Test User"
    }

Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "user": {
            "name": "Test User",
            "email": "test@test.com",
            "dob": "31/01/1990"
        }
    }

Response (failure):

    {
        "success": false,
        "message": "User already exists"
    }
 
 
#### GET /hospitals
Returns list of hospitals

Request Params:
1. page: For pagination of results, optional, default value is 1
2. district: Show hospitals for given district only. Optional
3. state: Show hospitals for given state only. Optional
4. pincode: Show hospitals nearby given pincode. Optional
5. maxResults: Max Hospitals in a given page. Optional, default value is 10

Request Body: None

Response: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String showing why query failed. Present when success is false
3. page: Integer showing current page of result
4. totalPages: Integer showing totalPages which can be queried
5. totalRecords: Integer showing total hospitals found for given criteria
6. data: array of objects, each containing detail of hospital in JSON format. Each object has following fields:
    1. id: String containing unique ID of hospital
    2. name: String containing name of Hospital
    3. address: String containing address of Hospital
    4. location: String containing "latitude, longitude". May be empty string if location is unavailable
    5. pincode: Integer showing pincode of hospital
    6. landline: String containing landline number of hospital. May be "Not Available"
    7. state: String showing state in which hospital resides.
    8. district: String showing district of hospital
    9. mobile: String containing mobile number of hospital. May be "Not Available"
    10. emergency: String containing emergency contact of hospital. May be "Not Available"

##### Sample Request
URL: /hospitals?maxResult=2
Response:

    {
        "success": true,
        "page": 1,
        "totalPages": 14721,
        "totalRecords": 29442,
        "data": [
            {
                "id": "5f265c5898966e300eb04824",
                "name": "Chakraborty Multi Speciality Hospital",
                "address": "Near Dollygunj Junction",
                "location": "11.6357989, 92.7120575",
                "pincode": 744101,
                "landline": "03192 251971",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            {
                "id": "5f265c5898966e300eb04825",
                "name": "Inhs Dhanvantri",
                "address": "Medical Board Office",
                "location": "11.8311681, 92.6586401",
                "pincode": 744101,
                "landline": "Not Available",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            }
        ]
    }

URL: /hospitals?pincode=208007&maxResults=1

Response: 
    
    {
        "success": true,
        "page": 1,
        "totalPages": 124,
        "totalRecords": 124,
        "data": [
            {
                "id": "5f265c6498966e300eb0afbd",
                "name": "Saral Nursing Home",
                "address": "OppositeThana Chakeri, Lal Bangla",
                "location": "",
                "pincode": 208007,
                "landline": "Not Available",
                "state": "Uttar Pradesh",
                "district": "Kanpur Nagar",
                "mobile": "Not Available",
                "emergency": "Not Available"
            }
        ]
    }
    
URL: /hospitals?pincode=208007&state=Goa

Response: 

    {
        "success": false,
        "message": "No data found"
    }

#### GET /predict

Request Params:
1. symptoms: String containing symptoms, each symptom separated by comma

Request Body: None

Response: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String for message, present if success is false
3. disease: String showing disease predicted based on symptoms
    
##### Sample Request

URL: /predict

Response:
    
    {
        "success": false,
        "message": "Symptoms Missing"
    }

URL: /predict?symptoms=back_pain,neck_pain

Response:
    
    {
        "success": true,
        "disease": "Cervical spondylosis"
    }
   
#### GET /appointments
Used to get the appointments made by user

Request Params: None

Request Body: None

Response: JSON Object containing following fields:
1. success: Boolean representing if request was successful or not
2. totalAppointments: Integer representing all appointments made by user
3. page: Integer for pagination
4. appointments: Array containing JSON object of each appointment. Each object has following fields:
    1. id: String showing unique id of appointment
    2. creationDate: String in format of "dd/mm/yyyy hh:mm", represents date of creation of appointment
    3. nextAppointment: String in format of "dd/mm/yyyy hh:mm", represents next date of appointment
    4. hospital: Object containing details of hospital in which appointment is made. See /hospitals route for this object's structure
    5. patient: Object containing details of patient. Contains name, email, dob
    6. closed: Boolean representing if case is closed
    7. appointments: array containing detail of each appointment visit

##### Sample Request

url: /appointments

Response:

    {
        "success": true,
        "totalAppointments": 1,
        "totalPages": 1,
        "page": 1,
        "appointments": [
            {
                "id": "5f28280a503a5c889ea1c41a",
                "creationDate": "03/08/2020 20:36",
                "nextAppointment": "20/08/2020 13:30",
                "hospital": {
                    "id": "5f265c5898966e300eb04824",
                    "name": "Chakraborty Multi Speciality Hospital",
                    "address": "Near Dollygunj Junction",
                    "location": "11.6357989, 92.7120575",
                    "pincode": 744101,
                    "landline": "03192 251971",
                    "state": "Andaman and Nicobar Islands",
                    "district": "South Andaman",
                    "mobile": "Not Available",
                    "emergency": "Not Available"
                },
                "patient": {
                    "name": "Test User",
                    "email": "test@test.com",
                    "dob": "31/08/1990"
                },
                "closed": false,
                "appointments": []
            }
        ]
    }

#### POST /appointments
Make new appointment to given hospital

Request Params: None
Request Body: JSON containing following fields:
1. hospital: Unique ID of hospital
2. date: Date of appointment in format "20/08/2020 hh:mm"

Response Body: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String in case success is false
3. appointment: Object showing detail of appointment, see GET /appointment for more info

##### Sample Request

Body: 
    
    {
	    "hospital": "5f265c5898966e300eb04824",
	    "date": "20/08/2020 13:30"
    }
    
Response Body:
    
    {
        "success": true,
        "appointment": {
            "id": "5f282aaa503a5c889ea1c41b",
            "creationDate": "03/08/2020 20:48",
            "nextAppointment": "20/08/2020 13:30",
            "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Chakraborty Multi Speciality Hospital",
                "address": "Near Dollygunj Junction",
                "location": "11.6357989, 92.7120575",
                "pincode": 744101,
                "landline": "03192 251971",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            "patient": {
                "name": "Test User",
                "email": "test@test.com",
                "dob": "31/08/1990"
            },
            "closed": false,
            "appointments": []
        }
    }

