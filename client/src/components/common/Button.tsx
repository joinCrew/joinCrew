import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '50px'};
  background-color: #74d36d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block; 
  margin: 0 auto;  

  &:hover {
    background-color: #65bb5f;
  }

  &:active {
    background-color: #57a34f;
  }
`;

const Button = ({ width, height, children }: ButtonProps) => {
  return (
    <StyledButton width={width} height={height}>
      {children}
    </StyledButton>
  );
};

export default Button;