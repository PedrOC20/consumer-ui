import styled from 'styled-components';

export const ButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: #84bb59;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: ${({ centered }) => (centered ? '0 auto' : '0')};

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`
