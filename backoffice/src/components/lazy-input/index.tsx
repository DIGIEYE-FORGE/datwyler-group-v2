import React from "react";
import Input from "../input";
type inputInterface = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: string) => void;
};

interface LazyInputProps extends inputInterface {
  type: "text" | "number" | "range" | "color" | "textearea";
  value: string | number;
  timeout?: number;
  label?: string;
  onChange: (value: string | number) => void;
}

function LazyInput({
  type,
  value,
  timeout = 500,
  onChange,
  ...props
}: LazyInputProps) {
  const [state, setState] = React.useState(value);
  const [initialRender, setInitialRender] = React.useState(true);
  const [timer, setTimer] = React.useState<any>(null);

  React.useMemo(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (!initialRender) {
      setTimer(
        setTimeout(() => {
          onChange(state);
        }, timeout)
      );
    } else {
      setInitialRender(false);
    }
  }, [state]);

  if (type === "text" || type === "number")
    return (
      <Input
        {...props}
        style={{ width: "4.5rem" }}
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    );
  return (
    <input
      {...props}
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  );
}

export { type LazyInputProps };
export default LazyInput;
