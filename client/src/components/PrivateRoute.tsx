// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export const PrivateRoute = () => {
//   const { token } = useAuth();

//   if (!token) {
//     return <Navigate to={"/login"} />;
//   }
//   return <Outlet />;
// };
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  role?: string;
}

export const PrivateRoute = ({ role }: PrivateRouteProps) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
