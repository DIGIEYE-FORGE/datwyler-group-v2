import styled from "styled-components";
import { lighten, rgba } from "polished";
import { useProvider } from "../provider";
const StyledButton = styled.button`
  &,
  &::after,
  &::before {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
  white-space: nowrap;
  border: none;
  cursor: pointer;
  padding: 0.5em 1em;
  text-transform: Capitalize;
  &.contained {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"] || props.color};
    color: white;
    box-shadow: 0 0.2em 0.5em #7f7f7f7f;
    &:hover {
      box-shadow: 0 0.2em 0.5em
        ${(props) =>
          rgba(
            props.theme.palette[props.color || "primary"] || props.color,
            0.9
          )};
    }
    &:active {
      box-shadow: inset 0 0.1em 0.5em 0.1em rgba(0, 0, 0, 0.1);
    }
    &.disabled {
      background-color: #aeaeae;
      color: #fff;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  &.outlined {
    background-color: transparent;
    color: ${(props) =>
      props.theme.palette[props.color || "primary"] || props.color};
    border: 0.1em solid
      ${(props) => props.theme.palette[props.color || "primary"] || props.color};
    &:hover {
      box-shadow: 0 0em 0.5em
          ${(props) =>
            rgba(
              props.theme.palette[props.color || "primary"] || props.color,
              0.3
            )},
        inset 0 0em 0.5em
          ${(props) =>
            rgba(
              props.theme.palette[props.color || "primary"] || props.color,
              0.3
            )};
    }
    &:active {
      box-shadow: none;
    }
  }
  &.indicator {
    position: relative;
    color: ${(props) =>
      props.theme.palette[props.color || "primary"] || props.color};
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      height: 0.2em;
      background-color: ${(props) =>
        props.theme.palette[props.color || "primary"] || props.color};
      width: 0;
      transition-property: width;
    }
    &:hover::after {
      width: 100%;
    }
  }
  &.double-indicator {
    position: relative;
    color: ${(props) =>
      props.theme.palette[props.color || "primary"] || props.color};
    &::after,
    &::before {
      content: "";
      position: absolute;
      height: 0.2em;
      background-color: ${(props) =>
        props.theme.palette[props.color || "primary"] || props.color};
      width: 0;
      transition-property: width;
    }
    &::before {
      top: 0;
      right: 0;
    }
    &::after {
      bottom: 0;
      left: 0;
    }
    &:hover::after,
    &:hover::before {
      width: 100%;
    }
  }
  &.text {
    color: ${(props) =>
      props.theme.palette[props.color || "primary"] || props.color};
    &:hover {
      background-color: ${(props) =>
        rgba(
          props.theme.palette[props.color || "primary"] || props.color,
          0.1
        )};
    }
    &.disabled {
      :hover {
        background-color: transparent;
      }
      color: ${(props) =>
        rgba(
          props.theme.palette[props.color || "primary"] || props.color,
          0.5
        )};
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  &.none {
    background-color: transparent;
    color: inherit;
    border: none;
    box-shadow: none;
    &:hover {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

StyledButton.defaultProps = {
  theme: {
    palette: {
      primary: "#3e1bdb",
      secondary: "#f50057",
      success: "#4caf50",
      info: "#2196f3",
      warning: "#ff9800",
      danger: "#f44336",
      light: "#f1f1f1",
    },
  },
};

interface Props {
  variant?:
    | "contained"
    | "outlined"
    | "indicator"
    | "double-indicator"
    | "text"
    | "none";
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  close?: boolean;
  type?: "button" | "submit" | "reset";
}
interface Context {
  closePopover?: () => void;
}
const Button = ({ variant = "contained", rounded = "md", ...props }: Props) => {
  const { closePopover } = useProvider<Context>();

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
    if (props.close && closePopover) {
      closePopover();
    }
  };
  return (
    <StyledButton
      type={props.type || "button"}
      color={props.color}
      onClick={handleClick}
      className={`${variant} rounded-${rounded} ${props.className} ${
        props.disabled ? "disabled" : ""
      }`}
      style={{
        ...props.style,
      }}
    >
      {props.children || "Button"}
    </StyledButton>
  );
};

export default Button;
