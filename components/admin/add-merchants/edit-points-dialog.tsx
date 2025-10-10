"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface EditPointsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { newPoints: number; expiryDate: Date; reason: string }) => void;
  userName: string;
  userId: string;
  currentPoints: number;
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

export default function EditPointsDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userId,
  currentPoints,
  currentExpiryDate
}: EditPointsDialogProps) {
  const [newPoints, setNewPoints] = useState(currentPoints.toString());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentExpiryDate));
  const [selectedReason, setSelectedReason] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleConfirm = () => {
    if (selectedDate && selectedReason && newPoints) {
      onConfirm({
        newPoints: parseInt(newPoints),
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
    setNewPoints(currentPoints.toString());
    setSelectedDate(new Date(currentExpiryDate));
    setSelectedReason("");
    setIsCalendarOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Edit Points - {userId}
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
              <span className="font-medium">Current Points:</span> {formatCurrency(currentPoints)}
            </p>
          </div>

          {/* Points Input */}
          <div className="space-y-2">
            <Label htmlFor="points" className="text-sm font-medium text-foreground">
              New Points Amount
            </Label>
            <Input
              id="points"
              type="number"
              value={newPoints}
              onChange={(e) => setNewPoints(e.target.value)}
              placeholder="Enter new points amount"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Current: {formatCurrency(currentPoints)} → New: {formatCurrency(parseInt(newPoints) || 0)}
            </p>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Expiry Date
            </Label>
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
            <p className="text-xs text-muted-foreground">
              Current: {currentExpiryDate}
            </p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Select Reason for Adjustments
            </Label>
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
              disabled={!selectedDate || !selectedReason || !newPoints}
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
