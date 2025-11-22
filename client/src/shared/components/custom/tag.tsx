import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onRemove?: () => void;
  startIcon?: React.ReactNode;
  colorScheme?: "cyan" | "orange";
}

export function Tag({ 
  children, 
  onRemove, 
  startIcon, 
  colorScheme = "cyan", 
  className,
  ...props 
}: TagProps) {
  
  const variants = {
    cyan: "bg-tag-bg-blue text-brand-400 border-transparent",
    orange: "bg-tag-bg-yellow text-amber-500 border-transparent",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-8 pl-2.5 pr-1.5 gap-1.5 text-sm font-bold rounded-md border transition-all",
        variants[colorScheme],
        className
      )}
      {...props}
    >
      {startIcon && (
        <span className="flex items-center justify-center opacity-90">
          {startIcon}
        </span>
      )}
      
      <span className="pb-0.5">{children}</span>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "ml-1 p-0.5 rounded-full",
            colorScheme === "cyan" ? "text-brand-400" : "",
            colorScheme === "orange" ? "text-amber-500" : ""
          )}
          aria-label="Remover item"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </Badge>
  );
}