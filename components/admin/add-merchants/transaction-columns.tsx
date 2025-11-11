'use client';

import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { formatCurrency, formatDateReadable, getTransactionTypeColor } from '@/lib/helper';
import { MerchantTransaction } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

export const transactionColumns: ColumnDef<MerchantTransaction>[] = [
  {
    accessorKey: 'merchantName',
    header: 'Merchant',
    cell: ({ row }) => {
      const merchantName = row.getValue('merchantName') as string;
      const merchantId = row.original.merchantId;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {merchantName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{merchantName}</p>
            <p className="text-xs text-gray-500">ID {merchantId}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
      const time = row.original.time;
      return (
        <div className="text-sm text-gray-900">
          <div>{formatDateReadable(date)}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'transactionId',
    header: 'Txn ID',
    cell: ({ row }) => {
      const transactionId = row.getValue('transactionId') as string;
      return (
        <div className="text-sm text-gray-900 font-mono">
          {transactionId.slice(-8)}...
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as MerchantTransaction['type'];
      return (
        <Badge className={`text-xs rounded-full border ${getTransactionTypeColor(type)}`}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return (
        <div className="text-sm font-medium text-gray-900">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'pointIssued',
    header: 'Point Issued',
    cell: ({ row }) => {
      const pointIssued = row.getValue('pointIssued') as number | null;
      return (
        <div className="text-sm text-gray-900">
          {pointIssued !== null ? (
            <span className="text-green-600 font-medium">{pointIssued}</span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as MerchantTransaction['status'];
      const getStatusColor = (status: MerchantTransaction['status']) => {
        switch (status) {
          case 'SUCCESSFUL':
            return 'bg-green-100 text-green-800 border-green-200';
          default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      };

      return (
        <Badge className={`text-xs rounded-full border ${getStatusColor(status)}`}>
          {status || '-'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const transactionId = row.original.transactionId;
      const merchantName = row.original.merchantName;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <Link href={`/dashboard/merchants/transactions/${transactionId}?merchantName=${`Transaction Details for ${merchantName}`}`}>
                View More Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
