import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { token, logOut } = useAuth();
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
            {/* <Link to={"/dynamicpage"} className="font-work-sans text-custom-orange">
            Dynamic Page
          </Link> */}
            <Link to={"/login"} className="font-work-sans text-custom-orange">
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 font-work-sans text-md">
            <Link to={"/"} className="font-work-sans text-custom-orange">
              Home
            </Link>
            <Link
              to={"/dynamicpage"}
              className="font-work-sans text-custom-orange"
            >
              Dynamic Page
            </Link>
            <button onClick={()=>logOut()} className="btn-yellow text-sm !p-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
