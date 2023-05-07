import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 2rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  overflow: hidden;
  &:hover,
  &:focus {
    border-color: #b3bcc5;
  }
  &.is-invalid {
    border-color: #dc3545;
  }
  input {
    padding: 0 0.5rem;
    flex-grow: 1;
    height: 100%;
    min-width: 0;
    margin-top: 0;
    border: none;

    &[disabled] {
      color: inherit;
    }
  }
`;

type Validition = (value: string) => boolean;
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  validations?: Validition[];
}

const Input = (props: Props) => {
  const [isInValid, setIsInValid] = useState<boolean>(false);
  const { iconStart, iconEnd, onChange, ...rest } = props;
  return (
    <StyledInput
      className={`${props.className} ${isInValid ? "is-invalid" : ""}`}
      style={props.style}
    >
      {iconStart && iconStart}
      <input
        onChange={(e) => {
          if (props.validations) {
            const isInValid = props.validations.some((v) => !v(e.target.value));
            setIsInValid(isInValid);
          }
          onChange && onChange(e);
        }}
        {...rest}
      />
      {iconEnd && iconEnd}
    </StyledInput>
  );
};

export default Input;
