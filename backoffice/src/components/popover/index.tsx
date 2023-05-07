import dataCenterIcon from "../../assets/icons/data-center.svg";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Provider from "../provider";

const StyledPopver = styled.div`
  position: relative;
  width: fit-content;
  .element {
    cursor: pointer;
  }
  .popover {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    transition: opacity 0.3s ease;
    z-index: 9999;
  }
  .open {
    animation: open 0.3s ease;
  }

  @keyframes open {
    0% {
      bottom: 50%;
      transform: translate(-50%, 50%);
    }
  }
`;
interface PopoverProps {
  children: [React.ReactNode, React.ReactNode];
}

const Popover = (props: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [popoverRef.current]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <Provider
      value={{
        closePopover: () => setOpen(false),
      }}
    >
      <StyledPopver ref={popoverRef}>
        <div
          onClick={(e) => {
            setOpen((curr) => !curr);
          }}
          className="element"
        >
          {props.children[0]}
        </div>
        <div
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? "all" : "none",
            padding: typeof props.children[1] === "string" ? "0.5rem" : "0",
            bottom: `0.5rem`,
            left: "50%",
            transform: "translate(-50%, 100%)",
          }}
          className={`popover ${open ?? "open"}`}
        >
          {props.children[1]}
        </div>
      </StyledPopver>
    </Provider>
  );
};

export default Popover;
