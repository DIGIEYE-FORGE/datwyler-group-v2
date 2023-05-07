import styled from "styled-components";

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 2rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0 0.5rem;
  &:hover {
    border-color: #b3bcc5;
  }
  select {
    flex-grow: 1;
    height: 100%;
    min-width: 0;
    margin-top: 0;

    option {
      display: inline-block;
      padding: 0.5rem;
    }
  }
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const Select = (props: Props) => {
  const { iconStart, iconEnd, ...rest } = props;
  return (
    <StyledSelect id="input" className={props.className} style={props.style}>
      {iconStart && iconStart}
      <select {...rest} />
      {iconEnd && iconEnd}
    </StyledSelect>
  );
};

export default Select;
