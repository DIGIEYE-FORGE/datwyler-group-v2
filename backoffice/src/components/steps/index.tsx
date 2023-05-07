import React from "react";
import styled from "styled-components";
import ProgressBar from "../progress-bar";

const DoneIcon = () => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.958 8.84C3.63073 8.84014 3.31686 8.71006 3.08564 8.47845L0.448194 5.84198C0.164404 5.5581 0.164404 5.09793 0.448194 4.81404C0.732076 4.53025 1.19225 4.53025 1.47613 4.81404L3.958 7.29592L10.524 0.729933C10.8079 0.446142 11.268 0.446142 11.5519 0.729933C11.8357 1.01381 11.8357 1.47399 11.5519 1.75787L4.83036 8.47845C4.59914 8.71006 4.28527 8.84014 3.958 8.84Z"
      fill="white"
    />
  </svg>
);
const StyledSteps = styled.div`
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  &,
  & * {
    box-sizing: border-box;
  }
  & > .labels {
    margin: auto;
    width: 80%;
    position: relative;
    display: flex;
    align-items: center;
    & > div:not(:last-child) {
      width: 100%;
    }
    .index {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      min-width: 28px;
      height: 28px;
      border: 1px solid #848484;
      color: #848484;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-property: background-color, color, border;
      &.current {
        color: #fff;
        background-color: #006ba9;
        border: none;
      }
      .label {
        position: absolute;
        bottom: -1.5rem;
        white-space: nowrap;
        color: #000;
      }
    }
  }
  & > .tabs {
    margin-top: 2rem;
    position: relative;
    flex-grow: 1;
    display: flex;
    overflow-x: hidden;
    .tab {
      position: absolute;
      min-width: 100%;
      height: calc(100% - 2em);
      transition: transform 0.3s ease;
    }
  }
`;

StyledSteps.defaultProps = {
  theme: {
    palette: {
      secondary: "#21252940",
      primary: "#3f51b5",
    },
  },
};

interface Node extends React.ReactElement {
  props: {
    label: string;
  };
}

interface Props {
  children: Node[] | Node;
  index?: number;
}

const parseIndex = (index: number, length: number) => {
  if (index < 0) {
    return 0;
  }
  if (index > length - 1) {
    return length - 1;
  }
  return index;
};

const getProgress = (index: number, activeTab: number) => {
  if (index === activeTab) return 0.5;
  if (index < activeTab) return 1;
  return 0;
};

const Steps = (props: Props) => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const labels = children.map((child: Node) => child.props.label);
  const [activeTab, setActiveTab] = React.useState(
    parseIndex(props.index || 0, children.length)
  );
  React.useEffect(() => {
    setActiveTab(parseIndex(props.index || 0, children.length));
  }, [props.index]);
  return (
    <StyledSteps className="">
      <div className="labels ">
        {labels.map((label, index) => (
          <div key={index} className=" flex align-center">
            <span className={`index ${index <= activeTab ? "current" : ""}`}>
              {index < activeTab ? (
                <DoneIcon />
              ) : (
                <span>{JSON.stringify(index + 1)}</span>
              )}
              <span className="label">{label}</span>
            </span>
            <ProgressBar
              className="flex-1 mx-3"
              color="#006BA9"
              progress={getProgress(index, activeTab)}
              title={""}
              height="6px"
              style={{
                display: index === labels.length - 1 ? "none" : "",
              }}
            />
          </div>
        ))}
      </div>
      <div className="tabs pt-4">
        {children.map((child: Node, index) => (
          <div
            className="tab"
            key={index}
            style={{
              transform: `translateX(${index * 100 - activeTab * 100}%)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </StyledSteps>
  );
};

interface TabProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Step = ({ children, className, style }: TabProps) => {
  return (
    <div style={style} className={`tab ${className}`}>
      {children}
    </div>
  );
};

export { Step };
export default Steps;
