import styled from "styled-components";
import Button from "../button";
import React from "react";
const StyledMenu = styled.div`
  position: absolute;
  width: 60%;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: #eceff5;
  text-align: center;
  z-index: 9999;
  margin-inline: 10px;
  animation: display 0.3s ease;
  border: 1px solid black;
  & .content {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #83accd;
    }
  }
`;

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 2rem;
  border: 1px solid #ced4da;
  border-radius: 4px;

  &:hover {
    border-color: #b3bcc5;
  }
  input {
    flex-grow: 1;
    height: 100%;
    min-width: 0;
    margin-top: 0;
  }
`;

interface Data {
  value: string;
  label: React.ReactNode | string;
}
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  children?: React.ReactNode;
  data?: Data[];
  width?: string;
}

const SelectV2 = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const refinput = React.useRef<HTMLInputElement>(null);
  const { iconStart, iconEnd, ...rest } = props;
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refinput.current && !refinput.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refinput]);
  return (
    <div className="  text-dark">
      <StyledSelect
        className={props.className}
        style={props.style}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {iconStart && iconStart}
        <input {...rest} disabled={true} value={value} className="pl-4" />
        <div className="pr-4">
          {
            <svg
              width="10"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.25L6 5.75L10.5 1.25"
                stroke="#343A40"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        </div>
      </StyledSelect>
      <StyledMenu isOpen={isOpen} ref={refinput}>
        {props.data?.map((item, index) => (
          <div
            onClick={() => {
              setValue(
                typeof item.label == "string" ? item.label : ("" as string)
              );
              setIsOpen(false);
              props.onChange?.(item.value as any);
            }}
            className="content"
            key={index}
          >
            {item.label}
          </div>
        ))}
      </StyledMenu>
    </div>
  );
};

export default SelectV2;
