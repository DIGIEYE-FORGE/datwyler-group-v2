import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={`bg-light dark:bg-primary-dark text-dark dark:text-light rounded shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
