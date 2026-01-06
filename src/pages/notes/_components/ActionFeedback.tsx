import { useState, useEffect } from "react";
import { Check, Copy, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionFeedbackProps {
  onAction: () => void;
  actionType: "copy" | "save";
  title: string;
  variant?: "secondary" | "ghost" | "custom";
  size?: "sm" | "default";
  className?: string;
}

export function ActionFeedback({
  onAction,
  actionType,
  title,
  variant = "custom",
  size = "sm",
  className = "",
}: ActionFeedbackProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    onAction(); // runs sync
    setShowSuccess(true); // still shows check
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const Icon = showSuccess ? Check : actionType === "copy" ? Copy : Save;

  return (
    <Button
      variant={"secondary" === variant ? "secondary" : "ghost"}
      size={size}
      onClick={handleClick}
      title={title}
      className={`transition-all duration-200 ${
        showSuccess
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
          : ""
      } ${className}`}
    >
      {showSuccess ? (
        <Check className="h-4 w-4" />
      ) : actionType === "copy" ? (
        <Copy className="h-4 w-4" />
      ) : (
        <Save className="h-4 w-4" />
      )}
    </Button>
  );
}
