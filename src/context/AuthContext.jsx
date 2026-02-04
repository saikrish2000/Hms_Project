import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Small in-memory user store for local testing. Replace with real API in production.
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

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 300));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) {
      const err = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      phone: found.phone,
    };
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (userData) => {
    // In a real app this would call an API. Here we simply add to local storage and set user.
    const newUser = {
      id: Date.now().toString(),
      name: userData.name || "New User",
      email: userData.email,
      role: userData.role || "patient",
      phone: userData.phone || "",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
