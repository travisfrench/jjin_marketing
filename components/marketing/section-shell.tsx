import { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export function SectionShell({ children, className = "" }: SectionShellProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
