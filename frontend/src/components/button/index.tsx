import { tr } from "date-fns/locale";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "accent" | "success" | "danger" | "warning" | "info";
  variant?: "contained" | "outlined" | "text";
}
function Button({
  children,
  className,
  variant = "contained",
  color = "primary",
  disabled,
  ...props
}: Props) {
  const variants = {
    contained: `text-white bg-${color}`,
    outlined: `border-2 box-border border-${color} text-${color}`,
    text: `text-${color}`,
  };
  return (
    <button
      {...props}
      className={`${variants[variant]}  px-2 py-1 hover:shadow-md hover:brightness-105  active:brightness-95 active:shadow-black/25 active:shadow-inner rounded ${className} ${disabled ?'text-gray-400 bg-gray-100 clickable:cursor-not-allowed clickable:opacity-50 clickable:hover:opacity-50 clickable:active:opacity-50': ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
