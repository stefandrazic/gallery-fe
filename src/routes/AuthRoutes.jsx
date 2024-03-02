import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const AuthRoutes = () => {
  const { authToken } = useAuth();
  console.log(authToken);

  // Your authentication logic goes here...

  return authToken ? <Navigate to="/" /> : <Outlet />;
};
export default AuthRoutes;
