import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width="64px" />
        </Link>

        <div className="flex gap-5 font-work-sans text-md">
          <Link to={"/"} className="font-work-sans text-custom-orange">
            Home
          </Link>
          <Link to={"/dynamicpage"} className="font-work-sans text-custom-orange">
            Dynamic Page
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
