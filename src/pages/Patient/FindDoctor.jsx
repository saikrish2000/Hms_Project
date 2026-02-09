import { useAuth } from "../../context/AuthContext";
import PublicFindDoctor from "./PublicFindDoctor";
import PrivateFindDoctor from "./PrivateFindDoctor";

const FindDoctor = () => {
  const { isAuthenticated } = useAuth();

  // 🔥 DECISION POINT
  return isAuthenticated ? <PrivateFindDoctor /> : <PublicFindDoctor />;
};

export default FindDoctor;
