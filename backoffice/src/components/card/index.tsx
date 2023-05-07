import styled from "styled-components";

const StyledCard = styled.div`
  & {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
  }
`;
interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card = (props: Props) => {
  return (
    <StyledCard style={props.style} className={`  ${props.className}`}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
