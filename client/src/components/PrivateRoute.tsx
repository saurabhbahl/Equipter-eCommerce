// "use server"
// import { ReactElement, useState } from "react";
// import { Navigate } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";


// interface PrivateRouteProps {
//   Component: React.ComponentType;
// }

// const PrivateRoute = ({ Component }: PrivateRouteProps): ReactElement => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return isAuthenticated ? <Component /> : <Navigate to={"/login"} />;
// };

// export default PrivateRoute;

export const PrivateRoute = () => {
  // const { user } = useAuth();
  const isAuth = false;
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
