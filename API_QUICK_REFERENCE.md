# API Quick Reference Guide

## 🚀 Quick Start - Most Used Endpoints

### Authentication

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/forgot-password   - Request password reset
```

### Patient Operations

```
GET    /api/patients/:id                      - Get profile
PUT    /api/patients/:id                      - Update profile
GET    /api/patients/:id/appointments         - Get appointments
GET    /api/patients/:id/prescriptions        - Get prescriptions
POST   /api/appointments                      - Book appointment
PUT    /api/appointments/:id/reschedule       - Reschedule appointment
DELETE /api/appointments/:id                  - Cancel appointment
GET    /api/appointments/:id                  - Get appointment details
```

### Find Doctors

```
GET    /api/appointments/doctors                          - Search doctors
GET    /api/appointments/doctors/:id/available-slots      - Get available time slots
```

### Doctor Operations

```
GET    /api/doctors/:id                           - Get doctor profile
PUT    /api/doctors/:id                           - Update profile
GET    /api/doctors/:id/appointments               - Get doctor's appointments
PUT    /api/doctors/:doctorId/appointments/:id    - Update appointment status
GET    /api/doctors/:doctorId/patients/:patientId - View patient record
POST   /api/doctors/:doctorId/prescriptions       - Create prescription
```

### Blood Bank Operations

```
GET    /api/blood-banks/:id              - Get blood bank info
GET    /api/blood-banks/:id/inventory    - Get blood inventory
PUT    /api/blood-banks/:id/inventory    - Update inventory
GET    /api/blood-banks/:id/donations    - Get donations
POST   /api/blood-banks/:id/donations    - Record donation
GET    /api/blood-banks/:id/requests     - Get blood requests
PUT    /api/blood-banks/:id/requests/:id - Approve/reject request
```

### Blood Requests

```
POST   /api/blood-requests                              - Request blood
GET    /api/blood-banks/near?city=X&latitude=Y         - Find nearby blood banks
POST   /api/blood-donors/register                       - Register as donor
```

### Organ Donation

```
POST   /api/organ-donations                 - Register for organ donation
GET    /api/organ-donations/:patientId      - Get organ donation status
PUT    /api/organ-donations/:id             - Update organ donation
```

### Reviews

```
POST   /api/reviews                              - Submit review
GET    /api/doctors/:id/reviews                  - Get doctor reviews
GET    /api/hospitals/:id/reviews                - Get hospital reviews
```

### Hospitals

```
GET    /api/hospitals                   - Search hospitals
GET    /api/hospitals/:id               - Get hospital details
POST   /api/hospitals                   - Add hospital (admin)
```

### Admin

```
GET    /api/admin/dashboard/stats                           - Dashboard stats
GET    /api/admin/users                                     - Get all users
PUT    /api/admin/users/:id/deactivate                      - Deactivate user
PUT    /api/admin/blood-requests/:id                        - Approve blood request
GET    /api/admin/reports/appointments?startDate=X&endDate=Y - Generate report
```

---

## 📊 Data Models Summary

### User (Base)

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "hashed",
  "role": "patient|doctor|bloodbank|admin",
  "isVerified": "boolean",
  "isActive": "boolean"
}
```

### Patient (extends User)

```json
{
  "dateOfBirth": "date",
  "gender": "string",
  "bloodType": "string",
  "allergies": ["array"],
  "appointments": ["array"],
  "prescriptions": ["array"]
}
```

### Doctor (extends User)

```json
{
  "specialization": "string",
  "licenseNumber": "string",
  "yearsOfExperience": "number",
  "consultationFee": "number",
  "rating": "1-5",
  "appointments": ["array"]
}
```

### Appointment

```json
{
  "patientId": "uuid",
  "doctorId": "uuid",
  "appointmentDate": "date",
  "appointmentTime": "time",
  "status": "scheduled|confirmed|completed|cancelled",
  "reason": "text",
  "consultationFee": "number"
}
```

### Prescription

```json
{
  "appointmentId": "uuid",
  "patientId": "uuid",
  "doctorId": "uuid",
  "diagnosis": "text",
  "medicines": [
    {
      "medicineName": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "number"
    }
  ]
}
```

### Blood Donation

```json
{
  "donorId": "uuid",
  "bloodBankId": "uuid",
  "bloodType": "string",
  "quantityInML": "number",
  "donationDate": "date",
  "status": "pending|verified|used|expired"
}
```

### Blood Request

```json
{
  "patientId": "uuid",
  "bloodBankId": "uuid",
  "bloodType": "string",
  "quantityRequired": "number",
  "urgency": "low|medium|high|critical",
  "status": "pending|approved|rejected|fulfilled"
}
```

### Organ Donation

```json
{
  "patientId": "uuid",
  "organs": ["array"],
  "registrationDate": "date",
  "status": "registered|active|inactive|revoked",
  "familyConsent": "boolean"
}
```

---

## 🔐 Request Headers

All requests (except login/register) require:

```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

---

## ✅ HTTP Status Codes

```
200  - Success
201  - Created
400  - Bad Request
401  - Unauthorized
403  - Forbidden
404  - Not Found
409  - Conflict
500  - Server Error
```

---

## 📋 Common Request/Response Patterns

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": {...}
}
```

---

## 🔗 Frontend Integration Example

```javascript
// In src/utils/api.js or similar

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Patient API calls
export const patientAPI = {
  getProfile: (id) => API.get(`/patients/${id}`),
  updateProfile: (id, data) => API.put(`/patients/${id}`, data),
  getAppointments: (id, status = "all") =>
    API.get(`/patients/${id}/appointments`, { params: { status } }),
  getPrescriptions: (id) => API.get(`/patients/${id}/prescriptions`),
};

// Doctor API calls
export const doctorAPI = {
  getProfile: (id) => API.get(`/doctors/${id}`),
  getAppointments: (id, status = "all") =>
    API.get(`/doctors/${id}/appointments`, { params: { status } }),
  updateAppointment: (doctorId, appointmentId, data) =>
    API.put(`/doctors/${doctorId}/appointments/${appointmentId}`, data),
  createPrescription: (doctorId, data) =>
    API.post(`/doctors/${doctorId}/prescriptions`, data),
};

// Appointment API calls
export const appointmentAPI = {
  getDoctors: (specialty) =>
    API.get("/appointments/doctors", { params: { specialty } }),
  getSlots: (doctorId, date) =>
    API.get(`/appointments/doctors/${doctorId}/available-slots`, {
      params: { date },
    }),
  bookAppointment: (data) => API.post("/appointments", data),
  getDetails: (id) => API.get(`/appointments/${id}`),
  reschedule: (id, data) => API.put(`/appointments/${id}/reschedule`, data),
  cancel: (id, reason) =>
    API.delete(`/appointments/${id}`, { data: { reason } }),
};

// Blood Bank API calls
export const bloodBankAPI = {
  getProfile: (id) => API.get(`/blood-banks/${id}`),
  getInventory: (id) => API.get(`/blood-banks/${id}/inventory`),
  getDonations: (bloodBankId) =>
    API.get(`/blood-banks/${bloodBankId}/donations`),
  getRequests: (bloodBankId) => API.get(`/blood-banks/${bloodBankId}/requests`),
  approveRequest: (bloodBankId, requestId, data) =>
    API.put(`/blood-banks/${bloodBankId}/requests/${requestId}`, data),
};

// Blood Request API calls
export const bloodRequestAPI = {
  createRequest: (data) => API.post("/blood-requests", data),
  findNearby: (city, latitude, longitude) =>
    API.get("/blood-banks/near", { params: { city, latitude, longitude } }),
};

// Auth API calls
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (email, password) => API.post("/auth/login", { email, password }),
  logout: () => API.post("/auth/logout"),
  forgotPassword: (email) => API.post("/auth/forgot-password", { email }),
};

export default API;
```

---

## 💡 Usage in React Components

```javascript
// Example: Book Appointment
import { appointmentAPI } from "../utils/api";

const BookAppointment = () => {
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const response = await appointmentAPI.bookAppointment(appointmentData);
      console.log("Appointment booked:", response.data);
      // Show success toast
    } catch (error) {
      console.error("Booking failed:", error.response.data);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return {
    /* JSX */
  };
};
```

---

## 🧪 Testing Endpoints (cURL Examples)

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass@123",
    "phone": "1234567890",
    "role": "patient"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

### Get Doctors

```bash
curl -X GET "http://localhost:5000/api/appointments/doctors?specialty=Cardiology" \
  -H "Authorization: Bearer {token}"
```

### Book Appointment

```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "patientId": "uuid",
    "doctorId": "uuid",
    "appointmentDate": "2026-02-15",
    "appointmentTime": "10:00",
    "reason": "Checkup",
    "appointmentType": "in-clinic"
  }'
```

### Get Patient Appointments

```bash
curl -X GET "http://localhost:5000/api/patients/{patientId}/appointments?status=confirmed" \
  -H "Authorization: Bearer {token}"
```

---

## 🔍 Filtering & Pagination Parameters

### Common Query Parameters

```
limit={number}      - Records per page (default: 10)
offset={number}     - Skip records (default: 0)
page={number}       - Page number (alternative to offset)
status={status}     - Filter by status
date={YYYY-MM-DD}   - Filter by date
specialty={string}  - Filter by specialty
city={string}       - Filter by city
sortBy={field}      - Sort by field
sortOrder=asc|desc  - Sort order
```

### Examples

```
GET /api/patients/{id}/appointments?status=confirmed&limit=20&offset=0
GET /api/doctors?specialty=Cardiology&city=NYC&limit=10
GET /api/blood-requests?urgency=critical&status=pending
```

---

## 📞 Next Steps for Frontend Integration

1. Create API utility file with all endpoints
2. Create axios interceptors for auth tokens
3. Create custom hooks for API calls
4. Integrate AppointmentsContext with API calls
5. Add loading states and error handling
6. Add request/response logging
7. Add retry logic for failed requests
8. Add request timeout handling

---

## 🛠️ Development Workflow

1. **Setup Backend Server**
   - Create Express/Django server
   - Setup database
   - Implement all endpoints (reference: BACKEND_PLANNING_GUIDE.md)

2. **Test Endpoints**
   - Use Postman or similar tool
   - Test all CRUD operations
   - Test authentication flow

3. **Connect Frontend**
   - Update API base URL in frontend
   - Create API utility file
   - Update components to use API calls

4. **Replace Mock Data**
   - Replace mock doctors with API calls
   - Replace mock appointments with API calls
   - Replace AppointmentsContext with backend data

5. **Deploy**
   - Deploy backend to server
   - Update frontend API URL
   - Deploy frontend

---

**Complete backend planning document**: See [BACKEND_PLANNING_GUIDE.md](./BACKEND_PLANNING_GUIDE.md)
