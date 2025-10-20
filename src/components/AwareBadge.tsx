import { ShieldCheck } from "lucide-react";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AwareBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const AwareBadge = ({ size = "md", showText = true }: AwareBadgeProps) => {
  const sizeClasses = {
    sm: "h-5 px-2 text-xs",
    md: "h-6 px-3 text-sm",
    lg: "h-8 px-4 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <Badge
      className={`
        ${sizeClasses[size]} 
        bg-[hsl(var(--accent)/.4)] 
        border border-[hsl(var(--primary))] 
        text-[hsl(var(--primary))] 
        font-semibold shadow-sm
        flex items-center gap-1
        transition-none
        hover:bg-[hsl(var(--accent)/.4)]
      `}
    >
      <ShieldCheck 
        className={`${iconSizes[size]} text-[hsl(var(--primary))]`} 
        strokeWidth={2.5} 
      />
      <Award 
        className={`${iconSizes[size]} text-[hsl(var(--primary))]`} 
        strokeWidth={2.5} 
      />
      {showText && "Aware"}
    </Badge>
  );
};

