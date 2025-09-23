import { Shield } from "lucide-react";
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
      variant="secondary"
      className={`
        ${sizeClasses[size]} 
        bg-aware text-aware-foreground font-semibold 
        border-aware/20 shadow-sm
        flex items-center gap-1
        hover:bg-aware-dark transition-colors
      `}
    >
      <Shield className={iconSizes[size]} />
      {showText && "Aware"}
    </Badge>
  );
};