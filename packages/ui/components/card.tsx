import * as React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`rounded-xl border bg-card text-card-foreground ${className}`}>{children}</div>;
};