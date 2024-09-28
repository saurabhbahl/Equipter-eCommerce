import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header>
      <div className="container">
        <a href="#">
          <img src={logo} alt="Logo" width="64px" />
        </a>
      </div>
    </header>
  );
};

export default Header;
