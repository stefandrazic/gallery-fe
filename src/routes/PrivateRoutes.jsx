import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoutes = () => {
  const { authToken } = useAuth();
  console.log(authToken);

  // Your authentication logic goes here...

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
