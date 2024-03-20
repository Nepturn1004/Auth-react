import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import InputBox from '../../components/input';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import Google from '../../assets/images/Gmail.svg';
import Metamask from '../../assets/images/metamask-logo.svg';
import Twitter from '../../assets/images/twitter.svg';

import mobileLogo from '../../assets/images/logo-mobile.svg';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (value) => {
    setUserName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  useEffect(() => {}, [userName, password]);

  const handleClick = async () => {
    try {
      const data = {
        username: userName,
        password: password
      };

      console.log('Sending login request with data:', data);

      const response = await axios.post('http://127.0.0.1:5000/login', data);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        alert('Login Successful!!');
        navigate('/dashboard');
      } else if (response.status === 400) {
        const errorMessage = response.data.error;
        alert(errorMessage); // Display specific error message for invalid username or password
      } else {
        console.error('Unexpected response:', response);
        alert('Unexpected response from the server. Please try again later.');
      }
    } catch (error) {
      // Handle other types of errors
      if (error.response) {
        console.error('Server Error:', error.response.data);
        alert('An error occurred on the server. Please try again later.');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Request Error:', error.message);
        alert(
          'An error occurred while processing your request. Please try again later.'
        );
      }
    }
  };

  return (
    <div className="layout-size layout-background">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="main-contents">
          <div className="main-logo-area">
            <img className="main-logo-mobile" src={mobileLogo} alt="mobile" />
          </div>

          <h1 className="main-title">Welcome Back</h1>
          <p className="main-description">
            Go ahead and log in. Get access to your incredible account!
          </p>
          <div className="signup-form">
            <InputBox
              icon={faUser}
              type={'text'}
              placeholder="Username"
              onValueChange={handleNameChange}
            />

            <InputBox
              icon={faLock}
              marginTop={'20px'}
              placeholder="Password"
              type={'password'}
              onValueChange={handlePasswordChange}
            />
            <button type="button" className="proceed-btn" onClick={handleClick}>
              Log in
            </button>

            <p type="button" className="already-exist">
              I forget my password
            </p>
          </div>

          <div className="social-btn-group">
            <button type="button" className="social-btn">
              <img src={Google} alt="google" />
            </button>
            <button type="button" className="social-btn ml-20px">
              <img src={Metamask} alt="metamask" />
            </button>
            <button type="button" className="social-btn ml-20px">
              <img src={Twitter} alt="twitter" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
