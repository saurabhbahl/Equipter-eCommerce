// "use server"
// import { ReactElement, useState } from "react";
// import { Navigate } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// interface PrivateRouteProps {
//   Component: React.ComponentType;
// }

// const PrivateRoute = ({ Component }: PrivateRouteProps): ReactElement => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return isAuthenticated ? <Component /> : <Navigate to={"/login"} />;
// };

// export default PrivateRoute;

export const PrivateRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
