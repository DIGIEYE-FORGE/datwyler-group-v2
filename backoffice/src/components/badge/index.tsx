import styled from "styled-components";
import { rgba } from "polished";

const StyledBadge = styled.div`
  min-width: 45px;
  min-height: 45px;
  border-radius: 23px;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => rgba(props.color || "#7e7e7e", 0.1)};
  color: ${(props) => props.color || "#7e7e7e"};
  svg {
    path {
      fill: ${(props) => props.color};
    }
  }
`;

StyledBadge.defaultProps = {
  color: "#7e7e7e",
};

interface Props {
  children?: React.ReactNode;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Badge = (props: Props) => {
  return (
    <StyledBadge color={props.color || "#7e7e7e"}>{props.children}</StyledBadge>
  );
};

export default Badge;
