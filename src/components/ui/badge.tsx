import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-blue-600/10 text-blue-500 border border-blue-500/20",
        secondary: "bg-slate-800 text-slate-300 border border-slate-700",
        success: "bg-green-600/10 text-green-500 border border-green-500/20",
        warning: "bg-yellow-600/10 text-yellow-500 border border-yellow-500/20",
        destructive: "bg-red-600/10 text-red-500 border border-red-500/20",
        outline: "border border-slate-700 text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
