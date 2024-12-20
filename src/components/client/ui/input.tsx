import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} {...props} className={className} />;
  }
);

Input.displayName = "Input";

export default Input;
