import { Button } from "@/components/ui/button";
import { ExportDialogParam } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ExportButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  Dialog?: React.ComponentType<ExportDialogParam>;
}

export function ExportButton({ onClick, className, disabled, isLoading, Dialog }: Readonly<ExportButtonProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (Dialog) {
      setIsOpen(true);
    }
    onClick?.();
  };

  return (
    <>
      <Button
        className={cn('bg-theme-dark-green py-2 h-[42px] px-6', className)}
        onClick={handleClick}
        disabled={disabled}
        isLoading={isLoading}
        type="button"
      >
        Export
      </Button>
      {Dialog && (
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
}
