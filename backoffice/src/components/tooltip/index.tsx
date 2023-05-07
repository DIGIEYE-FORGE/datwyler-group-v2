import styled from "styled-components";

const StyledTooltip = styled.div`
  position: relative;
  width: fit-content;
  .element {
    cursor: pointer;
  }
  .popover {
    opacity: 0;
    pointer-events: none;
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
  &:hover .popover {
    opacity: 1;
    pointer-events: auto;
    &.top {
      animation: top 0.3s ease;
    }
    &.bottom {
      animation: bottom 0.3s ease;
    }
    &.left {
      animation: left 0.3s ease;
    }
    &.right {
      animation: right 0.3s ease;
    }
  }

  @keyframes top {
    0% {
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes bottom {
    0% {
      bottom: 50%;
      transform: translate(-50%, 50%);
    }
  }
  @keyframes left {
    0% {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes right {
    0% {
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
`;
interface PopoverProps {
  children: [React.ReactNode, React.ReactNode];
  position?: "top" | "bottom" | "left" | "right";
  offset?: string;
}

const Tooltip = (props: PopoverProps) => {
  const offset = props.offset || "0.5rem";
  const positionMap = {
    top: {
      top: `-${offset}`,
      left: "50%",
      transform: "translate(-50%, -100%)",
    },
    bottom: {
      bottom: `-${offset}`,
      left: "50%",
      transform: "translate(-50%, 100%)",
    },
    left: {
      top: "50%",
      left: `-${offset}`,
      transform: "translate(-100%, -50%)",
    },
    right: {
      top: "50%",
      right: `-${offset}`,
      transform: "translate(100%, -50%)",
    },
  };
  return (
    <StyledTooltip className="">
      <div className="element">{props.children[0]}</div>
      <div
        style={{
          padding: typeof props.children[1] === "string" ? "0.5rem" : "0",
          ...positionMap[props.position || "bottom"],
        }}
        className={`popover ${props.position || "bottom"}`}
      >
        {props.children[1]}
      </div>
    </StyledTooltip>
  );
};

export default Tooltip;
