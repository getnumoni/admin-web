"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface EditExpiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { expiryDate: Date; reason: string }) => void;
  userName: string;
  userId: string;
  currentExpiryDate: string;
}

const adjustmentReasons = [
  "Fraudulent Activities",
  "Suspicious Transactions",
  "Policy Violation",
  "Account Security Breach",
  "Manual Review Required",
  "Customer Request",
  "System Error Correction",
  "Other"
];

export default function EditExpiryDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId,
  currentExpiryDate
}: EditExpiryDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentExpiryDate));
  const [selectedReason, setSelectedReason] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleConfirm = () => {
    if (selectedDate && selectedReason) {
      onConfirm({
        expiryDate: selectedDate,
        reason: selectedReason
      });
      onClose();
      resetForm();
    }
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedDate(new Date(currentExpiryDate));
    setSelectedReason("");
    setIsCalendarOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Edit Expiry - {userId}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 font-medium">
              You are modifying a user&apos;s wallet details. This action will be logged for audit purposes.
              Reason for modification is required.
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">User:</span> {userName} ({userId})
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-medium">Current Expiry:</span> {currentExpiryDate}
            </p>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Expiry Date
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select Reason for Adjustments
            </label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a reason..." />
              </SelectTrigger>
              <SelectContent>
                {adjustmentReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-theme-dark-green text-theme-dark-green hover:bg-theme-lighter-green"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedReason}
              className="bg-theme-dark-green hover:bg-theme-dark-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
