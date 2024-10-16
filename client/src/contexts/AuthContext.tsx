// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User } from "../types/schemas/UserSchemas";
// import axios from "axios";
// import { BackendUrl } from "../utils/useEnv";

// interface AuthContextType {
//   token: string | null;
//   user: User | null;
//   loginAction: (data: any) => Promise<void>;
//   logOut: () => void;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       // fetchUserData(storedToken);
//     }
//   }, []);

//   const loginAction = async (data: any) => {
//     try {
//       const response = await axios.post(`${BackendUrl}/auth/login`, data);
//       const res = response.data;

//       if (res.success) {
//         setUser(res.userData);
//         setToken(res.token);
//         localStorage.setItem("token", res.token);
//         navigate("/dynamicpage");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/schemas/UserSchemas";
import axios from "axios";
import { BackendUrl } from "../utils/useEnv";

interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (data: any) => Promise<void>;
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
      // Set user state with role
      setUser({ id: payload.userId, role: payload.role });
    }
  }, []);

  const loginAction = async (data: any) => {
    try {
      const response = await axios.post(`${BackendUrl}/auth/login`, data);
      const res = response.data;

      if (res.success) {
        setUser({ id: res.userData.id, role: res.userData.role });
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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
