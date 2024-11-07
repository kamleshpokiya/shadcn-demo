import React from "react";
import { cn } from "@/lib/utils";

type ProvidersProps = {
  className?: string;
} & React.ComponentProps<"main">;

const Providers: React.FC<ProvidersProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <main className={cn("", className)} {...props}>
      {children}
    </main>
  );
};

export default Providers;
