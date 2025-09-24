import * as React from "react";

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
      {...props}
    >
      {children}
    </button>
  );
};