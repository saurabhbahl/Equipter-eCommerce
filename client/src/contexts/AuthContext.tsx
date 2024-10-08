import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/schemas/UserSchemas";
import { BackendUrl } from "../utils/url";

interface AuthContextType {
  token: string;
  user: User | null;
  loginAction: (data: any) => void;
  logOut: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data: any) => {
    try {
      const response = await fetch(`${BackendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res)
      if (res.success) {
        setUser(res.userData);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/dynamicpage");
        return;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
