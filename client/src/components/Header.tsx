import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../utils/useEnv";

const Header = () => {
  const { token, logOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (token) {
        try {
          const response = await axios.post(
            `${BackendUrl}/admin/check-admin`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsAdmin(response.data.success);
        } catch (error:any) {
          const { data } = error.response;
          if (data && data.message === "Access denied." && !data.success) {
            setIsAdmin(false);
            return;
          } else if (data &&data.message === "Invalid token." &&!data.success) {
            logOut();
          } else if (data &&data.message === "Token expired." &&!data.success) {
            logOut();
          }
          setIsAdmin(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [token]);

  if (isLoading) {
    return null;
  }

  return (
    <header>
      <div className="container flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width="64px" />
        </Link>
        {!token ? (
          <div className="flex gap-5 font-work-sans text-md">
            <Link to={"/"} className="font-work-sans text-custom-orange">
              Home
            </Link>
            <Link to={"/login"} className="font-work-sans text-custom-orange">
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 font-work-sans text-md">
            <Link to={"/"} className="font-work-sans text-custom-orange">
              Home
            </Link>
            <Link to={"/sample"} className="font-work-sans text-custom-orange">
              Sample
            </Link>
            {isAdmin && ( // admin link only if the user is confirmed as admin
              <Link to={"/admin"} className="font-work-sans text-custom-orange">
                Admin
              </Link>
            )}
            <button
              onClick={() => logOut()}
              className="btn-yellow text-sm !p-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
