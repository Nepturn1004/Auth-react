import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import InputBox from '../../components/input';
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock
} from '@fortawesome/free-solid-svg-icons';

import Google from '../../assets/images/Gmail.svg';
import Metamask from '../../assets/images/metamask-logo.svg';
import Twitter from '../../assets/images/twitter.svg';

import mobileLogo from '../../assets/images/logo-mobile.svg';

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleNameChange = (value) => {
    setUserName(value);
  };

  const handleEmailChange = (value) => {
    setUserEmail(value);
  };

  const handlePhoneChange = (value) => {
    setUserPhone(value);
  };

  const handlePasswordChange = (value) => {
    setUserPassword(value);
  };

  useEffect(() => {}, [userName, userEmail]);

  const handleProceed = () => {
    const data = {
      username: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword
    };
    console.log(data);
    axios
      .post('http://127.0.0.1:5000/signup', data)
      .then((response) => {
        if (response.status === 400) {
          alert('All input is required');
        }
        if (response.status === 409) {
          alert('User already exists. Please login');
        }
        console.log('Response: ', response.data);
        const serverPassword = response.data.newUser.password;
        localStorage.setItem('severPassword', serverPassword);
        alert('User created successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error message: ', error);
      });
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

          <h1 className="main-title">Create Account</h1>
          <p className="main-description">
            Provide necessary information to proceed with registration or sign
            up with social media
          </p>
          <div className="signup-form">
            <InputBox
              icon={faUser}
              type={'text'}
              placeholder="Username"
              onValueChange={handleNameChange}
            />
            <InputBox
              icon={faEnvelope}
              marginTop={'20px'}
              type={'email'}
              placeholder="Email"
              onValueChange={handleEmailChange}
            />
            <InputBox
              icon={faPhone}
              marginTop={'20px'}
              type={'text'}
              placeholder="Phone"
              onValueChange={handlePhoneChange}
            />
            <InputBox
              icon={faLock}
              marginTop={'20px'}
              type={'password'}
              placeholder="Password"
              onValueChange={handlePasswordChange}
            />
            <button
              type="button"
              className="proceed-btn"
              onClick={handleProceed}
            >
              Proceed
            </button>

            <button type="button" className="already-exist">
              I already have an account
            </button>
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

export default Signup;
