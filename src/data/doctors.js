// Shared mock doctors data (used by FindDoctor and BookAppointment)
import doctor1 from "../assets/doctors/doctor1.png";
import doctor2 from "../assets/doctors/doctor2.png";
import doctor5 from "../assets/doctors/doctor5.jpeg";
import doctor4 from "../assets/doctors/doctor4.png";

export const MOCK_DOCTORS = [
  {
    id: "1",
    name: "Dr. vamshi krishna Chary",
    specialty: "Cardiology",
    experience: 15,
    hospital: "Seven Hills Hospital",
    rating: 4.9,
    availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
    consultationFee: 1000,
    photo: doctor1,
    approved: false,
    bio: "Senior cardiologist with 15 years of experience in advanced cardiac care.",
  },
  {
    id: "2",
    name: "Dr. Ashok Bathina",
    specialty: "Neurology",
    experience: 12,
    hospital: "City Care Hospital",
    rating: 4.8,
    availableSlots: ["11:00 AM", "3:00 PM"],
    consultationFee: 1200,
    photo: doctor2,
    approved: false,
    bio: "Experienced neurologist specializing in stroke and neuro disorders.",
  },
  {
    id: "3",
    name: "Dr. Nikhil Kongari",
    specialty: "Orthopedics",
    experience: 10,
    hospital: "Apollo Clinics",
    rating: 4.7,
    availableSlots: ["9:00 AM", "1:00 PM"],
    consultationFee: 1900,
    photo: doctor4,
    approved: false,
    bio: "Orthopedic specialist focused on joint replacement and trauma care.",
  },
  {
    id: "4",
    name: "Dr. Yedukondalu",
    specialty: "General Medicine",
    experience: 8,
    hospital: "MedLife Hospital",
    rating: 4.6,
    availableSlots: ["10:30 AM", "12:30 PM"],
    consultationFee: 1700,
    photo: doctor5,
    approved: false,
    bio: "General physician providing comprehensive primary healthcare.",
  },
];

export default MOCK_DOCTORS;
