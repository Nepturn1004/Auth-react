import { useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRUE } from 'sass';

const InputBox = (props) => {
  const [inputValue, setInputValue] = useState('');

  const divStyle = {
    marginTop: props.marginTop ? props.marginTop : '0px'
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    props.onValueChange(value);
  };

  return (
    <div className="input-container" style={divStyle}>
      <FontAwesomeIcon icon={props.icon} className="icon" />
      <div className="seperater"></div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="input-field"
        onChange={handleChange}
        value={inputValue}
        required
      />
    </div>
  );
};

export default InputBox;
