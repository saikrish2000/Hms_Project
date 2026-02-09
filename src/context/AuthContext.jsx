import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

/* MOCK USERS (API READY) */
const MOCK_USERS = [
  {
    id: "p1",
    name: "Patient One",
    email: "patient@example.com",
    password: "patient123",
    role: "patient",
    phone: "+10000000001",
  },
  {
    id: "d1",
    name: "Dr. Alice",
    email: "doctor@example.com",
    password: "doctor123",
    role: "doctor",
    approved: true, // ✅ Approved for testing
    phone: "+10000000002",
  },
  {
    id: "b1",
    name: "Blood Bank",
    email: "blood@example.com",
    password: "blood123",
    role: "bloodbank",
    phone: "+10000000003",
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    phone: "+10000000004",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  /* LOGIN */
  const login = async (email, password) => {
    await new Promise((res) => setTimeout(res, 300));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      throw new Error("Invalid credentials");
    }

    /* 🔐 Doctor approval check */
    if (found.role === "doctor" && !found.approved) {
      throw new Error("Doctor account pending approval by admin");
    }

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      phone: found.phone,
      approved: found.approved !== false, // ✅ Include approval status
    };

    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));

    return safeUser;
  };

  /* REGISTER */
  const register = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name || "New User",
      email: userData.email,
      role: userData.role || "patient",
      approved: userData.role !== "doctor", // doctors need approval
      phone: userData.phone || "",
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  };

  /* LOGOUT */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
