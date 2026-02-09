import { FiBell } from "react-icons/fi";
import { useNotifications } from "../../context/NotificationContext";

const NotificationBell = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-bell">
      <FiBell size={20} />
      {notifications.length > 0 && (
        <span className="notification-count">
          {notifications.length}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
