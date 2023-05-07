import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";

const StyledProgressPie = styled.div`
  & {
    position: relative;
  }
  .bg-primary {
    background-color: ${(props) => props.theme.palette.primary};
  }
  .text-primary {
    color: ${(props) => props.theme.palette.primary};
  }
  .text-background {
    color: ${(props) =>
      props.theme.mode === "light"
        ? darken(0.1, props.theme.light.background)
        : lighten(0.1, props.theme.dark.background)};
  }
  .stroke-background {
    stroke: ${(props) =>
      props.theme.mode === "light"
        ? darken(0.1, props.theme.light.background)
        : lighten(0.1, props.theme.dark.background)};
  }
  .stroke-primary {
    stroke: ${(props) => props.theme.palette.primary};
  }
  .fill-primary {
    fill: ${(props) => props.theme.palette.primary};
  }
  .progress-circle {
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.5s ease;
  }
  .background-circle {
    position: absolute;
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

StyledProgressPie.defaultProps = {
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
interface Props {
  progress: number | string;
  children?: React.ReactNode;
  background?: string;
  width?: string;
  stokeWidth?: number;
  color?: string;
  title?: string | number | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
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
const ProgressPie = (props: Props) => {
  const [progress, setProgres] = useState(parseProgress(0));
  useEffect(() => {
    setProgres(parseProgress(props.progress));
  }, [props.progress]);
  return (
    <StyledProgressPie
      style={{
        width: props.width || "100%",
        aspectRatio: "1/1",
        ...props.style,
      }}
      className={`progress-pie ${props.className || ""}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={`background-circle ${
            props.background ? "" : "stroke-background"
          }`}
          cx="50"
          cy="50"
          // stroke={props.background}
          r={50 - (props.stokeWidth || 1) / 2}
          strokeWidth={props.stokeWidth || 1}
        />
        <circle
          className={`progress-circle ${props.color ? "" : "stroke-primary"}`}
          cx="50"
          cy="50"
          stroke={props.color}
          r={50 - (props.stokeWidth || 1) / 2}
          strokeWidth={props.stokeWidth || 1}
          strokeDasharray={(100 - (props.stokeWidth || 1)) * Math.PI}
          strokeDashoffset={
            (100 - (props.stokeWidth || 1)) *
            Math.PI *
            (1 - Math.min(Math.max(progress, 0), 1))
          }
        />
      </svg>
      <div className="title text-primary" style={{ color: props.color }}>
        {props.children || (props.title ?? `${progress * 100}%`)}
      </div>
    </StyledProgressPie>
  );
};

export default ProgressPie;
