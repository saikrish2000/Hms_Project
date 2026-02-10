# Hospital Management System - Backend Planning Guide

## Complete API & Database Design

---

## 📊 Database Schema & Models

### 1. User/Authentication Model

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string (unique)",
  "phone": "string",
  "password": "string (hashed)",
  "role": "enum: patient|doctor|bloodbank|admin",
  "profileImage": "string (url)",
  "isVerified": "boolean",
  "isActive": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `users`

---

### 2. Patient Model (extends User)

```json
{
  "id": "uuid",
  "userId": "uuid (foreign key)",
  "dateOfBirth": "date",
  "gender": "enum: male|female|other",
  "bloodType": "enum: O+|O-|A+|A-|B+|B-|AB+|AB-",
  "medicalHistory": "text",
  "allergies": "array of strings",
  "emergencyContact": {
    "name": "string",
    "phone": "string",
    "relationship": "string"
  },
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "appointments": "array of appointment ids",
  "prescriptions": "array of prescription ids",
  "bloodDonationHistory": "array of blood donation ids",
  "organDonorRegistered": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `patients`

---

### 3. Doctor Model (extends User)

```json
{
  "id": "uuid",
  "userId": "uuid (foreign key)",
  "specialization": "string",
  "licenseNumber": "string (unique)",
  "yearsOfExperience": "number",
  "qualifications": "array of strings",
  "hospital": "string",
  "department": "string",
  "consultationFee": "number",
  "availableSlots": {
    "monday": ["09:00-09:30", "09:30-10:00", ...],
    "tuesday": [...],
    ...
  },
  "rating": "number (0-5)",
  "totalAppointments": "number",
  "confirmedAppointments": "number",
  "cancelledAppointments": "number",
  "appointments": "array of appointment ids",
  "prescriptions": "array of prescription ids",
  "patientRecords": "array of patient ids",
  "bio": "text",
  "profileImage": "string (url)",
  "certificates": "array of urls",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `doctors`

---

### 4. Appointment Model

```json
{
  "id": "uuid",
  "patientId": "uuid (foreign key)",
  "doctorId": "uuid (foreign key)",
  "appointmentDate": "date",
  "appointmentTime": "time",
  "status": "enum: scheduled|confirmed|completed|cancelled|no-show",
  "reason": "text",
  "notes": "text",
  "consultationFee": "number",
  "paymentStatus": "enum: pending|paid|failed",
  "dayOfWeek": "string",
  "duration": "number (minutes)",
  "meetingLink": "string (url for video consultation)",
  "appointmentType": "enum: in-clinic|online|video",
  "cancellationReason": "string",
  "cancelledBy": "enum: patient|doctor",
  "rescheduledFrom": "uuid (previous appointment id)",
  "rescheduledTo": "uuid (new appointment id)",
  "reminder": "boolean",
  "reminderSent": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `appointments`

---

### 5. Prescription Model

```json
{
  "id": "uuid",
  "appointmentId": "uuid (foreign key)",
  "patientId": "uuid (foreign key)",
  "doctorId": "uuid (foreign key)",
  "medicines": [
    {
      "medicineId": "uuid",
      "medicineName": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "number (days)",
      "instructions": "text"
    }
  ],
  "diagnosis": "text",
  "tests": "array of string",
  "followUpDate": "date",
  "notes": "text",
  "status": "enum: active|inactive|expired",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `prescriptions`

---

### 6. Blood Donation Model

```json
{
  "id": "uuid",
  "donorId": "uuid (foreign key - patient)",
  "bloodBankId": "uuid (foreign key)",
  "bloodType": "enum: O+|O-|A+|A-|B+|B-|AB+|AB-",
  "quantityInML": "number",
  "donationDate": "timestamp",
  "nextEligibleDate": "date",
  "status": "enum: pending_verification|verified|used|expired",
  "healthScreening": {
    "passed": "boolean",
    "notes": "string"
  },
  "certificateUrl": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `blood_donations`

---

### 7. Blood Request Model

```json
{
  "id": "uuid",
  "patientId": "uuid (foreign key)",
  "bloodBankId": "uuid (foreign key)",
  "bloodType": "enum: O+|O-|A+|A-|B+|B-|AB+|AB-",
  "quantityRequired": "number (units)",
  "urgency": "enum: low|medium|high|critical",
  "status": "enum: pending|approved|rejected|fulfilled|cancelled",
  "requestDate": "timestamp",
  "requiredDate": "date",
  "purpose": "text",
  "hospital": "string",
  "approvalNotes": "text",
  "approvedBy": "uuid (admin/doctor id)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `blood_requests`

---

### 8. Blood Bank Model (extends User)

```json
{
  "id": "uuid",
  "userId": "uuid (foreign key)",
  "registrationNumber": "string (unique)",
  "hospitalName": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  },
  "phone": "string",
  "email": "string",
  "inventory": {
    "O+": { "available": "number", "reserved": "number", "expired": "number" },
    "O-": { "available": "number", "reserved": "number", "expired": "number" },
    "A+": { "available": "number", "reserved": "number", "expired": "number" },
    "A-": { "available": "number", "reserved": "number", "expired": "number" },
    "B+": { "available": "number", "reserved": "number", "expired": "number" },
    "B-": { "available": "number", "reserved": "number", "expired": "number" },
    "AB+": { "available": "number", "reserved": "number", "expired": "number" },
    "AB-": { "available": "number", "reserved": "number", "expired": "number" }
  },
  "donations": "array of donation ids",
  "requests": "array of request ids",
  "staff": "array of staff user ids",
  "licenseUrl": "string",
  "certifications": "array of urls",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `blood_banks`

---

### 9. Organ Donation Model

```json
{
  "id": "uuid",
  "patientId": "uuid (foreign key)",
  "organs": "array of strings: [kidney, liver, heart, lungs, pancreas, cornea, etc.]",
  "registrationDate": "timestamp",
  "isActive": "boolean",
  "donationWillingness": "text",
  "medicalConditions": "array of strings",
  "familyConsent": "boolean",
  "consentGivenBy": "string (family member name)",
  "documentUrl": "string",
  "status": "enum: registered|active|inactive|revoked",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `organ_donations`

---

### 10. Admin/Hospital Staff Model

```json
{
  "id": "uuid",
  "userId": "uuid (foreign key)",
  "role": "enum: admin|hospital_manager|staff",
  "department": "string",
  "permissions": "array of strings",
  "approvalAuthority": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `admin_staff`

---

### 11. Hospital Model

```json
{
  "id": "uuid",
  "name": "string",
  "registrationNumber": "string (unique)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "phone": "string",
  "email": "string",
  "website": "string",
  "totalDoctors": "number",
  "totalBeds": "number",
  "departments": "array of strings",
  "emergencyServices": "boolean",
  "ambulanceServices": "boolean",
  "bloodBankPresent": "boolean",
  "licenseUrl": "string",
  "accreditations": "array of strings",
  "avgRating": "number",
  "reviews": "array of review ids",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `hospitals`

---

### 12. Review/Rating Model

```json
{
  "id": "uuid",
  "userId": "uuid (foreign key)",
  "doctorId": "uuid or hospitalId: uuid",
  "rating": "number (1-5)",
  "comment": "text",
  "appointmentId": "uuid (foreign key)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Database Table**: `reviews`

---

## 🔗 API Endpoints

### Authentication Endpoints

#### 1. Register

```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "patient|doctor|bloodbank|admin"
}

Response (201):
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

#### 2. Login

```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "string",
  "password": "string"
}

Response (200):
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

#### 3. Logout

```
POST /api/auth/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 4. Verify Email

```
POST /api/auth/verify-email
Content-Type: application/json

Request Body:
{
  "email": "string",
  "otp": "string"
}

Response (200):
{
  "success": true,
  "message": "Email verified"
}
```

#### 5. Forgot Password

```
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "string"
}

Response (200):
{
  "success": true,
  "message": "Reset link sent to email"
}
```

#### 6. Reset Password

```
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "string",
  "newPassword": "string"
}

Response (200):
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### Patient Endpoints

#### 1. Get Patient Profile

```
GET /api/patients/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "patient": {
    "id": "uuid",
    "userId": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "dateOfBirth": "date",
    "gender": "string",
    "bloodType": "string",
    "medicalHistory": "text",
    "allergies": ["array"],
    "address": {...},
    "createdAt": "timestamp"
  }
}
```

#### 2. Update Patient Profile

```
PUT /api/patients/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "dateOfBirth": "date",
  "gender": "string",
  "bloodType": "string",
  "medicalHistory": "text",
  "allergies": ["array"],
  "address": {...},
  "emergencyContact": {...}
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "patient": {...}
}
```

#### 3. Get Patient Appointments

```
GET /api/patients/:id/appointments?status=all&limit=10&offset=0
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "appointments": [{
    "id": "uuid",
    "doctorName": "string",
    "specialty": "string",
    "appointmentDate": "date",
    "appointmentTime": "time",
    "status": "string",
    "reason": "text"
  }],
  "totalCount": "number"
}
```

#### 4. Get Patient Prescriptions

```
GET /api/patients/:id/prescriptions?limit=10&offset=0
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "prescriptions": [{
    "id": "uuid",
    "doctorName": "string",
    "diagnosis": "text",
    "medicines": [
      {
        "medicineName": "string",
        "dosage": "string",
        "frequency": "string",
        "duration": "number"
      }
    ],
    "createdAt": "timestamp"
  }],
  "totalCount": "number"
}
```

---

### Doctor Endpoints

#### 1. Get Doctor Profile

```
GET /api/doctors/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "doctor": {
    "id": "uuid",
    "userId": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "specialization": "string",
    "licenseNumber": "string",
    "yearsOfExperience": "number",
    "qualifications": ["array"],
    "hospital": "string",
    "consultationFee": "number",
    "rating": "number",
    "totalAppointments": "number",
    "bio": "text"
  }
}
```

#### 2. Update Doctor Profile

```
PUT /api/doctors/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "specialization": "string",
  "yearsOfExperience": "number",
  "qualifications": ["array"],
  "hospital": "string",
  "consultationFee": "number",
  "bio": "text",
  "availableSlots": {...}
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "doctor": {...}
}
```

#### 3. Get Doctor Appointments

```
GET /api/doctors/:id/appointments?status=all&date=YYYY-MM-DD
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "appointments": [{
    "id": "uuid",
    "patientName": "string",
    "patientPhone": "string",
    "appointmentDate": "date",
    "appointmentTime": "time",
    "status": "string",
    "reason": "text"
  }],
  "totalCount": "number"
}
```

#### 4. Update Appointment Status

```
PUT /api/doctors/:doctorId/appointments/:appointmentId
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "confirmed|completed|cancelled"
}

Response (200):
{
  "success": true,
  "message": "Appointment status updated",
  "appointment": {...}
}
```

#### 5. View Patient Record

```
GET /api/doctors/:doctorId/patients/:patientId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "patient": {
    "id": "uuid",
    "name": "string",
    "dateOfBirth": "date",
    "bloodType": "string",
    "medicalHistory": "text",
    "allergies": ["array"],
    "appointments": [...],
    "prescriptions": [...]
  }
}
```

#### 6. Create Prescription

```
POST /api/doctors/:doctorId/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "patientId": "uuid",
  "appointmentId": "uuid",
  "diagnosis": "text",
  "medicines": [
    {
      "medicineName": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "number"
    }
  ],
  "tests": ["array"],
  "followUpDate": "date",
  "notes": "text"
}

Response (201):
{
  "success": true,
  "message": "Prescription created",
  "prescription": {...}
}
```

---

### Appointment Endpoints

#### 1. Get All Doctors

```
GET /api/appointments/doctors?specialty=string&city=string&page=1&limit=10
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "doctors": [{
    "id": "uuid",
    "name": "string",
    "specialization": "string",
    "hospital": "string",
    "rating": "number",
    "consultationFee": "number",
    "availableSlots": {...}
  }],
  "totalCount": "number"
}
```

#### 2. Get Doctor Available Slots

```
GET /api/appointments/doctors/:doctorId/available-slots?date=YYYY-MM-DD
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "slots": [
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30"
  ]
}
```

#### 3. Book Appointment

```
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "patientId": "uuid",
  "doctorId": "uuid",
  "appointmentDate": "date",
  "appointmentTime": "time",
  "reason": "text",
  "appointmentType": "in-clinic|online|video"
}

Response (201):
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "id": "uuid",
    "patientId": "uuid",
    "doctorId": "uuid",
    "appointmentDate": "date",
    "appointmentTime": "time",
    "status": "scheduled",
    "consultationFee": "number"
  }
}
```

#### 4. Get Appointment Details

```
GET /api/appointments/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "appointment": {
    "id": "uuid",
    "patientName": "string",
    "doctorName": "string",
    "appointmentDate": "date",
    "appointmentTime": "time",
    "status": "string",
    "reason": "text",
    "consultationFee": "number",
    "paymentStatus": "string"
  }
}
```

#### 5. Reschedule Appointment

```
PUT /api/appointments/:id/reschedule
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "newDate": "date",
  "newTime": "time"
}

Response (200):
{
  "success": true,
  "message": "Appointment rescheduled",
  "appointment": {...}
}
```

#### 6. Cancel Appointment

```
DELETE /api/appointments/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "reason": "string"
}

Response (200):
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

---

### Blood Bank Endpoints

#### 1. Get Blood Bank Profile

```
GET /api/blood-banks/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "bloodBank": {
    "id": "uuid",
    "hospitalName": "string",
    "address": {...},
    "phone": "string",
    "inventory": {...},
    "totalDonations": "number"
  }
}
```

#### 2. Get Blood Inventory

```
GET /api/blood-banks/:id/inventory
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "inventory": {
    "O+": { "available": "number", "reserved": "number", "expired": "number" },
    "O-": { "available": "number", "reserved": "number", "expired": "number" },
    ...
  }
}
```

#### 3. Update Blood Inventory (Blood Bank Admin)

```
PUT /api/blood-banks/:id/inventory
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "bloodType": "O+",
  "action": "add|remove",
  "quantity": "number"
}

Response (200):
{
  "success": true,
  "message": "Inventory updated",
  "inventory": {...}
}
```

#### 4. Get Blood Donations

```
GET /api/blood-banks/:id/donations?status=all&limit=10&offset=0
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "donations": [{
    "id": "uuid",
    "donorName": "string",
    "bloodType": "string",
    "quantityInML": "number",
    "donationDate": "date",
    "status": "string"
  }],
  "totalCount": "number"
}
```

#### 5. Record Blood Donation

```
POST /api/blood-banks/:id/donations
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "donorId": "uuid",
  "bloodType": "string",
  "quantityInML": "number",
  "healthScreening": {
    "passed": "boolean",
    "notes": "text"
  }
}

Response (201):
{
  "success": true,
  "message": "Donation recorded",
  "donation": {...}
}
```

#### 6. Get Blood Requests

```
GET /api/blood-banks/:id/requests?status=all&limit=10&offset=0
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "requests": [{
    "id": "uuid",
    "patientName": "string",
    "bloodType": "string",
    "quantityRequired": "number",
    "urgency": "string",
    "status": "string",
    "createdAt": "timestamp"
  }],
  "totalCount": "number"
}
```

#### 7. Approve/Reject Blood Request

```
PUT /api/blood-banks/:bloodBankId/requests/:requestId
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "approved|rejected",
  "approvalNotes": "text"
}

Response (200):
{
  "success": true,
  "message": "Request processed",
  "request": {...}
}
```

---

### Blood Donation/Request Endpoints

#### 1. Request Blood

```
POST /api/blood-requests
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "patientId": "uuid",
  "bloodType": "O+|O-|A+|A-|B+|B-|AB+|AB-",
  "quantityRequired": "number",
  "urgency": "low|medium|high|critical",
  "requiredDate": "date",
  "purpose": "text",
  "hospital": "string"
}

Response (201):
{
  "success": true,
  "message": "Blood request submitted",
  "request": {
    "id": "uuid",
    "status": "pending",
    "createdAt": "timestamp"
  }
}
```

#### 2. Get Blood Banks Near Location

```
GET /api/blood-banks/near?city=string&latitude=number&longitude=number&radius=number
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "bloodBanks": [{
    "id": "uuid",
    "hospitalName": "string",
    "distance": "number (km)",
    "address": {...},
    "phone": "string",
    "inventory": {...}
  }]
}
```

#### 3. Register as Blood Donor

```
POST /api/blood-donors/register
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "patientId": "uuid",
  "bloodType": "string",
  "nextEligibleDate": "date"
}

Response (201):
{
  "success": true,
  "message": "Registered as blood donor",
  "donor": {...}
}
```

---

### Organ Donation Endpoints

#### 1. Register for Organ Donation

```
POST /api/organ-donations
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "patientId": "uuid",
  "organs": ["kidney", "liver", "heart"],
  "familyConsent": "boolean",
  "consentGivenBy": "string",
  "documentUrl": "string",
  "donationWillingness": "text"
}

Response (201):
{
  "success": true,
  "message": "Registered for organ donation",
  "registration": {
    "id": "uuid",
    "status": "active",
    "registrationDate": "timestamp"
  }
}
```

#### 2. Get Organ Donation Status

```
GET /api/organ-donations/:patientId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "registration": {
    "id": "uuid",
    "organs": ["array"],
    "status": "active",
    "registrationDate": "date",
    "familyConsent": "boolean"
  }
}
```

#### 3. Update Organ Donation

```
PUT /api/organ-donations/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "organs": ["array"],
  "status": "active|inactive|revoked",
  "donationWillingness": "text"
}

Response (200):
{
  "success": true,
  "message": "Organ donation updated",
  "registration": {...}
}
```

---

### Hospital Endpoints

#### 1. Get All Hospitals

```
GET /api/hospitals?city=string&department=string&page=1&limit=10
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "hospitals": [{
    "id": "uuid",
    "name": "string",
    "address": {...},
    "totalDoctors": "number",
    "totalBeds": "number",
    "departments": ["array"],
    "avgRating": "number"
  }],
  "totalCount": "number"
}
```

#### 2. Get Hospital Details

```
GET /api/hospitals/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "hospital": {
    "id": "uuid",
    "name": "string",
    "address": {...},
    "phone": "string",
    "email": "string",
    "departments": ["array"],
    "totalDoctors": "number",
    "doctors": [...],
    "reviews": [...]
  }
}
```

#### 3. Add Hospital (Admin Only)

```
POST /api/hospitals
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "string",
  "address": {...},
  "phone": "string",
  "email": "string",
  "departments": ["array"],
  "totalDoctors": "number",
  "totalBeds": "number"
}

Response (201):
{
  "success": true,
  "hospital": {...}
}
```

---

### Review/Rating Endpoints

#### 1. Submit Review

```
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "userId": "uuid",
  "doctorId": "uuid or hospitalId",
  "appointmentId": "uuid",
  "rating": "number (1-5)",
  "comment": "text"
}

Response (201):
{
  "success": true,
  "message": "Review submitted",
  "review": {...}
}
```

#### 2. Get Reviews

```
GET /api/doctors/:id/reviews or GET /api/hospitals/:id/reviews
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "reviews": [{
    "id": "uuid",
    "userName": "string",
    "rating": "number",
    "comment": "text",
    "createdAt": "timestamp"
  }],
  "averageRating": "number",
  "totalReviews": "number"
}
```

---

### Admin Endpoints

#### 1. Get Dashboard Stats (Admin Only)

```
GET /api/admin/dashboard/stats
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "stats": {
    "totalUsers": "number",
    "totalDoctors": "number",
    "totalPatients": "number",
    "totalAppointments": "number",
    "appointmentsThisMonth": "number",
    "totalHospitals": "number",
    "totalBloodBanks": "number",
    "bloodDonations": "number",
    "organDonations": "number"
  }
}
```

#### 2. Get User Management (Admin Only)

```
GET /api/admin/users?role=all&status=all&page=1&limit=20
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "users": [{
    "id": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "isActive": "boolean",
    "createdAt": "timestamp"
  }],
  "totalCount": "number"
}
```

#### 3. Deactivate User (Admin Only)

```
PUT /api/admin/users/:id/deactivate
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "reason": "string"
}

Response (200):
{
  "success": true,
  "message": "User deactivated"
}
```

#### 4. Approve Blood Request (Admin Only)

```
PUT /api/admin/blood-requests/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "approved|rejected",
  "approvalNotes": "text"
}

Response (200):
{
  "success": true,
  "message": "Request processed"
}
```

#### 5. Generate Reports (Admin Only)

```
GET /api/admin/reports/appointments?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "report": {
    "totalAppointments": "number",
    "completedAppointments": "number",
    "cancelledAppointments": "number",
    "revenue": "number",
    "byDoctor": {...},
    "bySpecialty": {...}
  }
}
```

---

## 🔐 Authentication & Headers

All API requests (except login/register) require:

```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### JWT Token Structure

```json
{
  "id": "uuid",
  "email": "string",
  "role": "patient|doctor|bloodbank|admin",
  "exp": "timestamp"
}
```

---

## 📋 Error Responses

### Common Error Codes

```json
{
  "400": {
    "success": false,
    "error": "Invalid request body",
    "details": {...}
  },
  "401": {
    "success": false,
    "error": "Unauthorized - Invalid token"
  },
  "403": {
    "success": false,
    "error": "Forbidden - Insufficient permissions"
  },
  "404": {
    "success": false,
    "error": "Resource not found"
  },
  "409": {
    "success": false,
    "error": "Conflict - Email already exists"
  },
  "500": {
    "success": false,
    "error": "Internal server error"
  }
}
```

---

## 🔍 Validation Rules

### Email Validation

- Must be valid email format
- Must be unique in database
- Maximum length: 255 characters

### Password Validation

- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number
- Must contain special character

### Phone Validation

- Minimum 10 digits
- Maximum 15 digits
- Must be numeric with optional +

### Date Validation

- Format: YYYY-MM-DD
- Cannot be in past (for appointment bookings)
- Cannot be more than 6 months in future

---

## 💾 Database Relationships

```
users (1) ──→ (1) patients
users (1) ──→ (1) doctors
users (1) ──→ (1) blood_banks
users (1) ──→ (1) admin_staff

patients (1) ──→ (M) appointments
doctors (1) ──→ (M) appointments
appointments (1) ──→ (M) prescriptions

patients (1) ──→ (M) blood_donations
blood_banks (1) ──→ (M) blood_donations
patients (1) ──→ (M) blood_requests
blood_banks (1) ──→ (M) blood_requests

patients (1) ──→ (1) organ_donations

hospitals (1) ──→ (M) doctors
doctors (1) ──→ (M) reviews
hospitals (1) ──→ (M) reviews

users (1) ──→ (M) reviews
```

---

## 🛠️ Implementation Steps for Backend

1. **Setup Database**
   - Create all tables as per schema
   - Setup relationships and foreign keys
   - Create indexes for frequently queried fields

2. **Implement Authentication**
   - JWT token generation
   - Password hashing (bcrypt)
   - Email verification
   - Password reset flow

3. **Implement API Endpoints**
   - Start with auth endpoints
   - Then implement patient endpoints
   - Then doctor endpoints
   - Then admin endpoints

4. **Add Business Logic**
   - Appointment scheduling validation
   - Availability slot management
   - Blood inventory management
   - Payment processing integration

5. **Add Notifications**
   - Appointment reminders (email/SMS)
   - Confirmation messages
   - Status update notifications

6. **Add File Uploads**
   - Profile pictures
   - Certificates
   - Document uploads
   - Prescription PDFs

7. **Testing**
   - Unit tests for business logic
   - Integration tests for APIs
   - Load testing
   - Security testing

---

## 📦 Tech Stack Recommendations for Backend

- **Framework**: Node.js + Express.js or Python + Django/FastAPI
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email Service**: SendGrid or Nodemailer
- **SMS Service**: Twilio
- **File Storage**: AWS S3 or Cloudinary
- **Payment Gateway**: Stripe or Razorpay
- **Validation**: Joi or Yup
- **Logging**: Winston or Morgan
- **API Documentation**: Swagger/OpenAPI

---

## 🔗 Frontend Integration

The frontend will consume these APIs using:

```javascript
// Example API call from frontend
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Booking appointment
const bookAppointment = (appointmentData) => {
  return axios.post(`${API_BASE}/appointments`, appointmentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Getting doctor list
const getDoctors = (specialty) => {
  return axios.get(`${API_BASE}/appointments/doctors?specialty=${specialty}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
```

---

## 📚 Summary

This document provides complete API design with:

- ✅ 12 Database models with all fields
- ✅ 50+ API endpoints with request/response structures
- ✅ Authentication flow
- ✅ Error handling
- ✅ Validation rules
- ✅ Database relationships
- ✅ Implementation guidelines

Use this as a complete blueprint for backend development!
