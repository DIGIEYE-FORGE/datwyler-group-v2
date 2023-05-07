import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";
const StyledProgressBar = styled.div`
  .bg-primary {
    background-color: ${(props) => props.theme.palette.primary};
  }
  background: ${(props) =>
    props.theme.mode === "light"
      ? darken(0.1, props.theme.light.background)
      : lighten(0.1, props.theme.dark.background)};
  overflow: hidden;
  .text-primary {
    color: ${(props) => props.theme.palette.primary};
  }
  .text-background {
    color: ${(props) =>
      props.theme.mode === "light"
        ? darken(0.1, props.theme.light.background)
        : lighten(0.1, props.theme.dark.background)};
  }
`;
StyledProgressBar.defaultProps = {
  theme: {
    mode: "light",
    dark: {
      background: "#202124",
      color: "#f2f2f2",
    },
    light: {
      background: "#ffffff",
      color: "#202124",
    },
    palette: {
      primary: "#0D4C92",
    },
  },
};

const parseProgress = (progress: number | string): number => {
  if (typeof progress === "number") {
    return progress;
  }
  if (new RegExp(/^\d\d?\.?\d?%$/).test(progress)) {
    const value = parseFloat(progress) / 100;
    return value;
  }
  return 0;
};

interface Props {
  width?: string;
  height?: string;
  showValue?: boolean;
  color?: string;
  backgroundColor?: string;
  progress: number | string;
  title?: string | number | React.ReactNode;
  children?: React.ReactNode;
  radius?: string;
  style?: React.CSSProperties;
  className?: string;
}

const ProgressBar = (props: Props) => {
  const progres = parseProgress(props.progress);
  const minMaxProgres = Math.min(Math.max(progres, 0), 1);
  const title = props.title ?? `${(progres * 100).toFixed(2)}%`;
  const redius = props.radius || "9999px";
  const [width, setWidth] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeEvent: any = window.addEventListener("resize", () => {
      if (mainRef.current) {
        setWidth(mainRef.current.offsetWidth);
      }
    });
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
  useEffect(() => {
    if (mainRef.current) {
      setWidth(mainRef.current.offsetWidth);
    }
  }, [progres, props.width]);
  return (
    <StyledProgressBar
      ref={mainRef}
      style={{
        width: props.width || "100%",
        height: props.height || "2em",
        borderRadius: redius,
        position: "relative",
        ...props.style,
      }}
      className={props.className}
    >
      <span
        className="text-primary"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: props.color,
          whiteSpace: "nowrap",
        }}
      >
        {props.children || (props.showValue && title)}
      </span>
      <div
        className="bg-primary"
        style={{
          width: `${width * progres}px`,
          transition: "width 0.5s",
          height: "100%",
          backgroundColor: props.color,
          borderRadius: redius,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <span
          className="text-background"
          style={{
            position: "absolute",
            top: "50%",
            left: `${width / 2}px`,
            transform: `translate(-50%, -50%)`,
            whiteSpace: "nowrap",
            color: props.backgroundColor,
          }}
        >
          {props.children || (props.showValue && title)}
        </span>
      </div>
    </StyledProgressBar>
  );
};

export default ProgressBar;
