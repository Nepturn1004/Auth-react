import { useNavigate } from 'react-router-dom';
import './style.scss';

const Header = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="header-size header-item-center">
      <img className="header-logo" src="./logo.png" alt="imag" />
      <div className="header-bntgroup">
        <button className="header-loginbtn" type="button" onClick={handleLoginClick}>
          Log In
        </button>
        <button className="header-signupbtn" type="button" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
