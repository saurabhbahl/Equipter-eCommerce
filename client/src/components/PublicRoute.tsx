// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export const PublicRoute = () => {
//   const { token } = useAuth();

//   if (token) {
//     return <Navigate to="/admin" />;
//   }

//   return <Outlet/>
//   // return element;
// };
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export const PublicRoute = () => {
  const { token } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(-1); //redirect to previous route
    }
  }, [token, navigate]); 

  return <Outlet />; 
};