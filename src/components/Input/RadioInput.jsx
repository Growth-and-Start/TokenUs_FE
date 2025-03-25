// components/Input/RadioInput.jsx
import styled from "styled-components";
import { BACKGROUND, MAIN, GRAY_SCALE, TEXT } from "../../constants/colors";

function RadioInput({ className, children, name, data, onChange, options = [] }) {
  return (
    <RadioInputWrapper className={className}>
      <Label>{children}</Label>
      <OptionsWrapper>
        {options.map((option, index) => (
          <RadioItem key={index}>
            <RadioLabel >
            <Radio
              type="radio"
              name={name}
              checked={data === option.value}
              value={option.value}
              onChange={onChange}
            />
            <span>{option.label}</span>
          </RadioLabel>
          <Description>{option.description}</Description>
          </RadioItem>
        ))}
      </OptionsWrapper>
    </RadioInputWrapper>
  );
}


const RadioInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 520;
  font-size: 15px;
  padding-bottom: 10px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 12px;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Radio = styled.input`
  accent-color: ${MAIN.BLUE};
  transform: scale(1.5); 
  cursor: pointer;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 110px;
  color: #535761;

  span {
    &:hover {
      color: ${MAIN.BLUE};
    }
  }
`;


const Description = styled.span`
  font-size: 12px;
  color: ${GRAY_SCALE.GRAY500};
  flex: 1;
`;



export default RadioInput;
