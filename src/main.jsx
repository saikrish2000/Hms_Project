import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { AppointmentsProvider } from "./context/AppointmentsContext.jsx";
import { BloodBankProvider } from "./context/BloodBankContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <AppointmentsProvider>
        <BloodBankProvider>
          <App />
        </BloodBankProvider>
      </AppointmentsProvider>
    </NotificationProvider>
  </StrictMode>,
);
