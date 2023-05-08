interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "accent" | "success" | "danger" | "warning" | "info";
  variant?: "contained" | "outlined" | "text";
}
function Button({
  children,
  className,
  variant = "contained",
  color = "primary",
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
      className={`  ${variants[variant]}  px-2 py-1 hover:shadow-md hover:brightness-105  active:brightness-95 active:shadow-black/25 active:shadow-inner rounded ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
