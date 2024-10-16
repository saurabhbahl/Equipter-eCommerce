import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/admin" />;
  }

  return element;
};
