import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const CloseIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="15.5" fill="white" stroke="#951129" />
    <g clipPath="url(#clip0_540_239189)">
      <path
        d="M22.1999 9.8008C22.1006 9.70152 21.966 9.64575 21.8256 9.64575C21.6851 9.64575 21.5505 9.70152 21.4512 9.8008L16.0005 15.2515L10.5498 9.8008C10.4505 9.70152 10.3159 9.64575 10.1754 9.64575C10.035 9.64575 9.90035 9.70152 9.80104 9.8008C9.70177 9.9001 9.646 10.0348 9.646 10.1752C9.646 10.3156 9.70177 10.4503 9.80104 10.5496L15.2517 16.0002L9.80104 21.4509C9.70177 21.5502 9.646 21.6849 9.646 21.8253C9.646 21.9657 9.70177 22.1004 9.80104 22.1997C9.90035 22.299 10.035 22.3547 10.1754 22.3547C10.3159 22.3547 10.4505 22.299 10.5498 22.1997L16.0005 16.749L21.4512 22.1997C21.5505 22.299 21.6851 22.3547 21.8256 22.3547C21.966 22.3547 22.1006 22.299 22.1999 22.1997C22.2992 22.1004 22.355 21.9657 22.355 21.8253C22.355 21.6849 22.2992 21.5502 22.1999 21.4509L16.7493 16.0002L22.1999 10.5496C22.2992 10.4503 22.355 10.3156 22.355 10.1752C22.355 10.0348 22.2992 9.9001 22.1999 9.8008Z"
        fill="#951129"
      />
    </g>
    <defs>
      <clipPath id="clip0_540_239189">
        <rect
          width="12.7092"
          height="12.7092"
          fill="white"
          transform="translate(9.64551 9.64551)"
        />
      </clipPath>
    </defs>
  </svg>
);
const StyledSplitableTabs = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .tab-1 {
    width: 100%;
    height: 100%;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #3f4555;
      transition: opacity 0.3s ease;
      opacity: 0;
      z-index: 1;
      pointer-events: none;
    }
    &.open {
      &:hover {
        cursor: none;
        .pointer {
          cursor: inherit;
          z-index: 2;
          position: absolute;
          width: 2rem;
          height: 2rem;
          top: -1000px;
          left: 0;
        }
      }
      &:after {
        opacity: 0.3;
      }
    }
  }
  .tab-2 {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 643px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    background-color: #f5f6f8;
    &.open {
      transform: translateX(0);
    }
  }
`;

interface Props {
  open?: boolean;
  children: [React.ReactNode, React.ReactNode];
  className?: string;
  close?: () => void;
  style?: React.CSSProperties;
}
const SplitableTabs = (props: Props) => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  // const [open, setOpen] = useState<boolean>(props.open || false);

  useEffect(() => {
    if (pointerRef.current && tabsRef.current) {
      const pointer = pointerRef.current;
      const tabs = tabsRef.current;
      const eventListner = tabs.addEventListener("mousemove", (e) => {
        const { left, top } = tabs.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        pointer.style.left = `${x}px`;
        pointer.style.top = `${y}px`;
      });
      return () => {
        tabs.removeEventListener("mousemove", eventListner as any);
      };
    }
  }, []);
  return (
    <StyledSplitableTabs
      ref={tabsRef}
      className={props.className}
      style={props.style}
    >
      <div
        className={`tab-1 ${props.open ? "open" : ""}`}
        onClick={() => {
          // setOpen(false);
          props.open && props.close && props.close();
        }}
      >
        {props.children[0]}
        <div className="pointer" ref={pointerRef}>
          <CloseIcon />
        </div>
      </div>
      <div className={`tab-2 ${props.open ? "open" : ""}`}>
        {props.children[1]}
      </div>
    </StyledSplitableTabs>
  );
};

export default SplitableTabs;
