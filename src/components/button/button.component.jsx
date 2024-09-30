import './button.styles.jsx';

import { ButtonContainer } from './button.styles';

const Button = ({ children, centered, ...otherProps }) => {
  return <ButtonContainer centered={centered} { ...otherProps }>{ children }</ButtonContainer>
};

export default Button;