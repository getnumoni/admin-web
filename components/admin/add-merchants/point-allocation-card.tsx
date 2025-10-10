"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Snowflake } from "lucide-react";
import { useState } from "react";
import EditExpiryDialog from "./edit-expiry-dialog";
import FreezeWalletDialog from "./freeze-wallet-dialog";

interface PointAllocation {
  id: string;
  name: string;
  userId: string;
  avatar: string;
  pointBalance: number;
  expiresOn: string;
  location: string;
  isFrozen: boolean;
}

const mockPointAllocations: PointAllocation[] = [
  {
    id: "1",
    name: "Shai Hulud",
    userId: "#026669",
    avatar: "/avatars/shai-hulud.jpg",
    pointBalance: 30000,
    expiresOn: "20 June 2022",
    location: "Ikeja",
    isFrozen: false
  },
  {
    id: "2",
    name: "Shai Hulud",
    userId: "#026670",
    avatar: "/avatars/shai-hulud-2.jpg",
    pointBalance: 25000,
    expiresOn: "15 July 2022",
    location: "Victoria Island",
    isFrozen: true
  },
  {
    id: "3",
    name: "Shai Hulud",
    userId: "#026671",
    avatar: "/avatars/shai-hulud-3.jpg",
    pointBalance: 45000,
    expiresOn: "10 August 2022",
    location: "Lekki",
    isFrozen: false
  },
  {
    id: "4",
    name: "Shai Hulud",
    userId: "#026672",
    avatar: "/avatars/shai-hulud-4.jpg",
    pointBalance: 18000,
    expiresOn: "25 September 2022",
    location: "Surulere",
    isFrozen: false
  },
  {
    id: "5",
    name: "Shai Hulud",
    userId: "#026673",
    avatar: "/avatars/shai-hulud-5.jpg",
    pointBalance: 32000,
    expiresOn: "5 October 2022",
    location: "Ikoyi",
    isFrozen: true
  },
  {
    id: "6",
    name: "Shai Hulud",
    userId: "#026674",
    avatar: "/avatars/shai-hulud-6.jpg",
    pointBalance: 28000,
    expiresOn: "12 November 2022",
    location: "Yaba",
    isFrozen: false
  },
  {
    id: "7",
    name: "Shai Hulud",
    userId: "#026675",
    avatar: "/avatars/shai-hulud-7.jpg",
    pointBalance: 35000,
    expiresOn: "18 December 2022",
    location: "Gbagada",
    isFrozen: false
  },
  {
    id: "8",
    name: "Shai Hulud",
    userId: "#026676",
    avatar: "/avatars/shai-hulud-8.jpg",
    pointBalance: 22000,
    expiresOn: "3 January 2023",
    location: "Mushin",
    isFrozen: true
  }
];

function PointAllocationItem({ allocation, onFreeze, onUnfreeze, onEditExpiry, onEditPoints }: {
  allocation: PointAllocation;
  onFreeze: (id: string, reason: string) => void;
  onUnfreeze: (id: string) => void;
  onEditExpiry: (id: string, data: { expiryDate: Date; reason: string }) => void;
  onEditPoints: (id: string, data: { newPoints: number; expiryDate: Date; reason: string }) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);
  const [isEditPointsDialogOpen, setIsEditPointsDialogOpen] = useState(false);
  const [isEditExpiryDialogOpen, setIsEditExpiryDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 relative w-full">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={allocation.avatar} alt={allocation.name} />
          <AvatarFallback className="bg-blue-100 text-blue-800">
            {allocation.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{allocation.name}</span>
            {allocation.isFrozen && (
              <Snowflake className="h-4 w-4 text-theme-dark-green" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">{allocation.userId}</span>
        </div>

        {/* Action Menu */}
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {allocation.isFrozen ? (
              <DropdownMenuItem onClick={() => onUnfreeze(allocation.id)}>
                <Snowflake className="h-4 w-4 mr-2" />
                Unfreeze Wallet
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => setIsFreezeDialogOpen(true)}>
                <Snowflake className="h-4 w-4 mr-2" />
                Freeze Wallet
              </DropdownMenuItem>
            )}
            {/* <DropdownMenuItem onClick={() => setIsEditPointsDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Points
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => setIsEditExpiryDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Expiry Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Wallet Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Point Balance</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(allocation.pointBalance)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Expires on</span>
          <span className="text-sm text-foreground">{allocation.expiresOn}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Location</span>
          <span className="text-sm text-foreground">{allocation.location}</span>
        </div>
      </div>

      {/* Freeze Wallet Dialog */}
      <FreezeWalletDialog
        isOpen={isFreezeDialogOpen}
        onClose={() => setIsFreezeDialogOpen(false)}
        onConfirm={(reason) => onFreeze(allocation.id, reason)}
        userName={allocation.name}
        userId={allocation.userId}
      />

      {/* Edit Points Dialog */}
      {/* <EditPointsDialog
        isOpen={isEditPointsDialogOpen}
        onClose={() => setIsEditPointsDialogOpen(false)}
        onConfirm={(data) => onEditPoints(allocation.id, data)}
        userName={allocation.name}
        userId={allocation.userId}
        currentPoints={allocation.pointBalance}
        currentExpiryDate={allocation.expiresOn}
      /> */}

      {/* Edit Expiry Dialog */}
      <EditExpiryDialog
        isOpen={isEditExpiryDialogOpen}
        onClose={() => setIsEditExpiryDialogOpen(false)}
        onConfirm={(data) => onEditExpiry(allocation.id, data)}
        userName={allocation.name}
        userId={allocation.userId}
        currentExpiryDate={allocation.expiresOn}
      />
    </div>
  );
}

export default function PointAllocationCard() {
  const [allocations, setAllocations] = useState<PointAllocation[]>(mockPointAllocations);

  const handleFreeze = (id: string, reason: string) => {
    console.log(`Freezing wallet ${id} for reason: ${reason}`);
    setAllocations(prev =>
      prev.map(allocation =>
        allocation.id === id
          ? { ...allocation, isFrozen: true }
          : allocation
      )
    );
  };

  const handleUnfreeze = (id: string) => {
    setAllocations(prev =>
      prev.map(allocation =>
        allocation.id === id
          ? { ...allocation, isFrozen: false }
          : allocation
      )
    );
  };

  const handleEditExpiry = (id: string, data: { expiryDate: Date; reason: string }) => {
    console.log(`Editing expiry for ${id}:`, data);
    setAllocations(prev =>
      prev.map(allocation =>
        allocation.id === id
          ? {
            ...allocation,
            expiresOn: data.expiryDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })
          }
          : allocation
      )
    );
  };

  const handleEditPoints = (id: string, data: { newPoints: number; expiryDate: Date; reason: string }) => {
    console.log(`Editing points for ${id}:`, data);
    setAllocations(prev =>
      prev.map(allocation =>
        allocation.id === id
          ? {
            ...allocation,
            pointBalance: data.newPoints,
            expiresOn: data.expiryDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })
          }
          : allocation
      )
    );
  };

  return (
    <div className="w-full">

      {/* Scrollable Grid Container */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[370px] overflow-y-auto pr-2 w-full"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--theme-dark-green) var(--theme-gray-200)'
        }}
      >
        {allocations.map((allocation) => (
          <PointAllocationItem
            key={allocation.id}
            allocation={allocation}
            onFreeze={handleFreeze}
            onUnfreeze={handleUnfreeze}
            onEditExpiry={handleEditExpiry}
            onEditPoints={handleEditPoints}
          />
        ))}
      </div>

      {/* Custom scrollbar styling */}

    </div>
  );
}