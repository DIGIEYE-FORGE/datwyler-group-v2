import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  .modal {
  }
  &.open {
    z-index: 999;
    justify-content: center;
    align-items: center;

    .modal {
      &.slide-up {
        animation: slide-up 0.5s ease-out forwards;
      }
      &.fade-in {
        animation: fade-in 0.5s ease forwards;
      }
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes slide-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slide-right {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

interface Props {
  children: React.ReactNode;
  open: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClose?: () => void;
  transition?:
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "fade-in"
    | "zoom"
    | "none";
}

const Modal = ({ transition = "fade-in", ...props }: Props) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      props.onClose && props.onClose();
    }
  };
  return (
    <StyledModal
      className={`${props.open && "open"}`}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        style={props.style}
        className={`modal ${props.className} ${props.open && transition}`}
      >
        {props.children}
      </div>
    </StyledModal>
  );
};

export default Modal;
