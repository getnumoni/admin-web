"use client";

import { useState } from "react";
import MerchantDescriptionEditDialog from "./merchant-description-edit-dialog";

interface MerchantDescriptionProps {
  description: string;
  userId?: string;
  onEdit?: () => void;

}

export default function MerchantDescription({ description, onEdit: _onEdit, userId }: Readonly<MerchantDescriptionProps>) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditDialogOpen(true);
  //   onEdit?.();
  // };

  // const handleEditConfirm = (data: any) => {
  //   console.log('Updated description:', data);
  //   // Description update is handled by the dialog
  // };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Merchant Description</h3>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={handleEditClick}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit description
        </Button> */}
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">
          {description || "No description provided."}
        </p>
      </div>

      {/* Edit Dialog */}
      <MerchantDescriptionEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        description={description}
        userId={userId}
      />
    </div>
  );
}
