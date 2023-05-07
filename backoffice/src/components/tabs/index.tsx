import React, { useEffect } from "react";
import styled from "styled-components";

const StyledTabs = styled.div`
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
    position: relative;
    display: flex;
    height: 2em;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.secondary};
    .first {
      width: 1em;
    }
    .label {
      padding: 0 1em;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${({ theme }) => theme.palette.info};
      cursor: pointer;
      text-transform: capitalize;
      border: 1px solid transparent;
      /* border-bottom: 1px solid ${({ theme }) => theme.palette.secondary}; */
      &.active {
        color: #000;
        background-color: #fff;
        border-radius: 4px 4px 0 0;
        box-shadow: 0 1px #fff;
      }
    }
    .last {
      flex-grow: 1;
    }
  }
  & > .tabs {
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

StyledTabs.defaultProps = {
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
  onChange?: (index: number) => void;
}

const Tabs = (props: Props) => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const labels = children.map((child: Node) => child.props.label);
  const [activeTab, setActiveTab] = React.useState(0);

  useEffect(() => {
    props.onChange && props.onChange(activeTab);
  }, [activeTab]);

  return (
    <StyledTabs className="">
      <div className="labels ">
        <div className="label first" onClick={() => setActiveTab(0)}></div>
        {labels.map((label, index) => (
          <div
            className={`label ${index === activeTab && "active"}`}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            <span>{label}</span>
          </div>
        ))}
        <div
          className="label last"
          onClick={() => setActiveTab(labels.length - 1)}
        ></div>
      </div>
      <div className="tabs">
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
    </StyledTabs>
  );
};

interface TabProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Tab = ({ children, className, style }: TabProps) => {
  return (
    <div style={style} className={`tab ${className}`}>
      {children}
    </div>
  );
};

export { Tab };
export default Tabs;
