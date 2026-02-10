import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = "info") => {
    setNotifications((prev) => [
      { id: Date.now(), message, type },
      ...prev,
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
