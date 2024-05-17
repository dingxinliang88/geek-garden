import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthRoute;
