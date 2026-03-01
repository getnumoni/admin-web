'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeletePos } from "@/hooks/mutation/useDeletePos";
import { downloadQRCodeImageWithLogo, getDealStatusText, getStatusColor } from "@/lib/helper";
import { PosData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Download, Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeletePOSDialog from "./delete-pos-dialog";
import UpdatePOSDialog from "./update-pos-dialog";


export const posColumns: ColumnDef<PosData>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => {
      const serialNumber = row.index + 1;
      return (
        <div className="text-gray-600 text-sm text-center">
          {serialNumber}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "posId",
    header: "POS ID",
    cell: ({ row }) => {
      const posId = row.original.posId;
      return (
        <div className="text-gray-600 text-sm">
          {posId}
        </div>
      );
    },
  },
  {
    accessorKey: "posName",
    header: "POS Name",
    cell: ({ row }) => {
      const posName = row.original.posName;
      return (
        <div className="text-gray-600 text-sm">
          {posName}
        </div>
      );
    },
  },
  {
    accessorKey: "merchantId",
    header: "Merchant ID",
    cell: ({ row }) => {
      const merchantId = row.original.merchantId;
      return (
        <div className="text-gray-600 text-sm">
          {merchantId}
        </div>
      );
    },
  },
  {
    accessorKey: "branchId",
    header: "Branch ID",
    cell: ({ row }) => {
      const branchId = row.original.branchId;
      return (
        <div className="text-gray-600 text-sm">
          {branchId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
    cell: ({ row }) => {
      const bankName = row.original.bankName;
      return (
        <div className="text-gray-600 text-sm">
          {bankName}
        </div>
      );
    },
  },
  {
    accessorKey: "accountNo",
    header: "Account No",
    cell: ({ row }) => {
      const accountNo = row.original.accountNo;
      return (
        <div className="text-gray-600 text-sm">
          {accountNo}
        </div>
      );
    },
  },
  {
    accessorKey: "accountHolderName",
    header: "Account Holder Name",
    cell: ({ row }) => {
      const accountHolderName = row.original.accountHolderName;
      return (
        <div className="text-gray-600 text-sm">
          {accountHolderName}
        </div>
      );
    },
  },
  {
    accessorKey: "bankCode",
    header: "Bank Code",
    cell: ({ row }) => {
      const bankCode = row.original.bankCode;
      return (
        <div className="text-gray-600 text-sm">
          {bankCode}
        </div>
      );
    },
  },
  {
    accessorKey: "bankTransferCode",
    header: "Bank Transfer Code",
    cell: ({ row }) => {
      const bankTransferCode = row.original.bankTransferCode;
      return (
        <div className="text-gray-600 text-sm">
          {bankTransferCode}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location;
      return (
        <div className="text-gray-600 text-sm">
          {location}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {getDealStatusText(status)}
        </span>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: "View Transactions",
    cell: ({ row }) => {
      const posId = row.original.posId;
      const merchantName = row.original.merchantName;
      const posName = row.original.posName;
      const merchantId = row.original.merchantId;

      const handleCopyLink = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_MERCHANT_URL;
          const encodedMerchantName = encodeURIComponent(merchantName || '');
          const encodedPosName = encodeURIComponent(posName || '');
          const transactionLink = `${baseUrl}/pos-transaction-history/${posId}?merchantName=${encodedMerchantName}&posName=${encodedPosName}&merchantId=${merchantId}`;
          await navigator.clipboard.writeText(transactionLink);
          toast.success("Transaction link copied to clipboard");
        } catch {
          toast.error("Failed to copy link");
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`${process.env.NEXT_PUBLIC_MERCHANT_URL}/pos-transaction-history/${posId}?merchantName=${encodeURIComponent(merchantName || '')}&posName=${encodeURIComponent(posName || '')}&merchantId=${merchantId}`} target="_blank">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="View Transactions"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            type="button"
            size="sm"
            className="h-8 w-8 p-0 bg-theme-dark-green"
            onClick={handleCopyLink}
            title="Copy Transaction Link"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'posQRCode',
    header: "POS QR Code",
    cell: ({ row }) => {
      const qrCode = row.original.posQRCode;
      const posId = row.original.posId;
      const posName = row.original.posName;
      const merchantLogo = row.original.merchantLogo;
      const location = row.original.location;
      const address = row.original.address;

      const handleDownloadQRCode = async () => {
        if (!qrCode) return;

        try {
          const filename = posName || posId || 'pos';
          await downloadQRCodeImageWithLogo(qrCode, filename, merchantLogo, location, address, posId);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to download QR code';
          console.error('Error downloading QR code:', errorMessage, error);
          toast.error(errorMessage);
        }
      };

      if (!qrCode) {
        return (
          <div className="text-gray-400 text-sm">
            N/A
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden bg-white">
            <Image
              src={qrCode}
              alt={`QR Code for ${posName || posId}`}
              width={48}
              height={48}
              className="object-contain"
              unoptimized
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadQRCode}
            className="h-8 w-8 p-0"
            title="Download QR Code as PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <ActionCell pos={row.original} />;
    },
  },
];




// Action Cell Component
function ActionCell({ pos }: { pos: PosData }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { handleDeletePos, isPending: isDeletePending, isSuccess: isDeleteSuccess } = useDeletePos();

  const handleDeletePOSClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeletePos(pos.id);
  };

  const handleUpdatePOSClick = () => {
    setIsUpdateDialogOpen(true);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsDeleteDialogOpen(false);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={handleUpdatePOSClick}
              className="cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit POS
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeletePOSClick}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete POS
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <UpdatePOSDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        pos={pos}
      />

      <DeletePOSDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        posName={pos.posName}
        posId={pos.posId}
        isLoading={isDeletePending}
      />
    </>
  );
}