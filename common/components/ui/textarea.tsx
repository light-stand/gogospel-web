import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md max-h-[200px] ",
          "border border-neutral-400 bg-white px-3 py-2",
          "text-base placeholder:text-neutral-500",
          "focus-visible:border-neutral-500 focus-visible:shadow-sm focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
