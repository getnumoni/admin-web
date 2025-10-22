import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PrivilegesActionsProps {
  selectedRole: string;
  onSave: () => void;
  onCancel: () => void;
  hasUnsavedChanges?: boolean;
  isCreatingPrivilegeMapping?: boolean;
}

export default function PrivilegesActions({
  selectedRole,
  onSave,
  onCancel,
  hasUnsavedChanges = false,
  isCreatingPrivilegeMapping
}: PrivilegesActionsProps) {
  const [isSaving, setIsSaving] = useState(false);

  if (!selectedRole) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-end space-x-3 pt-4">
      <Button
        variant="outline"
        className="px-6"
        onClick={onCancel}
        disabled={isSaving}
      >
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        className="bg-theme-dark-green text-white px-6"
        disabled={isSaving}
        isLoading={isCreatingPrivilegeMapping}
        loadingText="Creating..."
      >
        Create
      </Button>

      {hasUnsavedChanges && (
        <div className="flex items-center text-sm text-amber-600">
          <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
          Unsaved changes
        </div>
      )}
    </div>
  );
}
