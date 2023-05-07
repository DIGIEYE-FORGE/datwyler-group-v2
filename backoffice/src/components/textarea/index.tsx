import styled from "styled-components";

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0.5rem;
  &:hover {
    border-color: #b3bcc5;
  }
  &:has(> textarea.is-invalid) {
    border-color: #dc3545;
  }
  textarea {
    flex-grow: 1;
    resize: vertical;
    height: 100%;
    width: 100%;
    min-width: 0;
    margin-top: 0;
  }
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  error?: boolean;
}

const Textarea = (props: Props) => {
  const { iconStart, iconEnd, error, ...rest } = props;
  return (
    <StyledInput className={props.className} style={props.style}>
      {iconStart && iconStart}
      <textarea {...rest} className={error ? "is-invalid" : ""} />
      {iconEnd && iconEnd}
    </StyledInput>
  );
};

export default Textarea;
