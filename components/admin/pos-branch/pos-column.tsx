'use client';

import { Button } from "@/components/ui/button";
import { downloadQRCodeWithLogo, getDealStatusText, getStatusColor } from "@/lib/helper";
import { PosData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import Image from "next/image";


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
      const posId = row.getValue("posId") as string;
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
      const posName = row.getValue("posName") as string;
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
      const merchantId = row.getValue("merchantId") as string;
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
      const branchId = row.getValue("branchId") as string | null;
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
      const bankName = row.getValue("bankName") as string;
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
      const accountNo = row.getValue("accountNo") as string;
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
      const accountHolderName = row.getValue("accountHolderName") as string;
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
      const bankCode = row.getValue("bankCode") as string;
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
      const bankTransferCode = row.getValue("bankTransferCode") as string;
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
      const location = row.getValue("location") as string;
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
      const status = row.getValue("status") as string;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {getDealStatusText(status)}
        </span>
      );
    },
  },
  {
    accessorKey: 'posQRCode',
    header: "POS QR Code",
    cell: ({ row }) => {
      const qrCode = row.getValue("posQRCode") as string | null | undefined;
      const posId = row.getValue("posId") as string;
      const posName = row.getValue("posName") as string;

      const handleDownloadQRCode = async () => {
        if (!qrCode) return;

        try {
          const filename = posName || posId || 'pos';
          await downloadQRCodeWithLogo(qrCode, filename, 'pdf');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to download QR code';
          console.error('Error downloading QR code:', errorMessage, error);
          // You can add toast notification here if needed
          // toast.error(errorMessage);
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
  }
];