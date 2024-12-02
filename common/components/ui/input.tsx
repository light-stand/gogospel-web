import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-neutral-400",
          "bg-white px-3 py-2 text-sm ring-offset-white",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950",
          "focus-visible:border-indigo-500 focus-visible:border-2  focus-visible:shadow-sm focus-visible:outline-none",
          "placeholder:text-neutral-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950",
          "dark:file:text-neutral-50 dark:placeholder:text-neutral-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
