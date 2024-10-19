import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/schemas/UserSchemas";
import axios from "axios";
import { BackendUrl } from "../utils/useEnv";


interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (data: any)=>any;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser({ id: payload.userId, role: payload.role });
    }
  }, []);

  const loginAction = async (data: any) => {
    try {
      const response = await axios.post(`${BackendUrl}/auth/login`, data);
      const res = response.data as any;

      if (res.success) {
         setUser({ id: res.userData.id, role: res.userData.role });
        setToken(res.token);
        localStorage.setItem("token", res.token);
        return res.success;
      }
    } catch (err:any) {
      console.log(err);
      return err?.response.data.message as string;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
