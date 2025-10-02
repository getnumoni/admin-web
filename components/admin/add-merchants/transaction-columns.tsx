'use client';

import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/data/transactions-data';
import { formatCurrency } from '@/lib/helper';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'merchant',
    header: 'Merchant',
    cell: ({ row }) => {
      const merchant = row.getValue('merchant') as Transaction['merchant'];
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            {merchant.logo ? (
              <Image
                src={merchant.logo}
                alt={`${merchant.name} logo`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {merchant.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{merchant.name}</p>
            <p className="text-xs text-gray-500">ID {merchant.id}</p>
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
      return (
        <div className="text-sm text-gray-900">
          {date}
        </div>
      );
    },
  },
  {
    accessorKey: 'txnId',
    header: 'Txn ID',
    cell: ({ row }) => {
      const txnId = row.getValue('txnId') as string;
      return (
        <div className="text-sm text-gray-900 font-mono">
          {txnId}
        </div>
      );
    },
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) => {
      const customer = row.getValue('customer') as string;
      return (
        <div className="text-sm text-gray-900">
          {customer}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as Transaction['type'];
      const getTypeColor = (type: Transaction['type']) => {
        switch (type) {
          case 'Purchase':
            return 'bg-blue-50 text-blue-700 border-blue-200';
          case 'Redemption':
            return 'bg-purple-50 text-purple-700 border-purple-200';
          case 'Donation':
            return 'bg-green-50 text-green-700 border-green-200';
          default:
            return 'bg-gray-50 text-gray-700 border-gray-200';
        }
      };

      return (
        <Badge className={`text-xs rounded-full border ${getTypeColor(type)}`}>
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
    accessorKey: 'pointsIssued',
    header: 'Point Issued',
    cell: ({ row }) => {
      const pointsIssued = row.getValue('pointsIssued') as number | 'Donation';
      return (
        <div className="text-sm text-gray-900">
          {pointsIssued === 'Donation' ? (
            <span className="text-green-600 font-medium">Donation</span>
          ) : (
            pointsIssued
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Transaction['status'];
      const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
          case 'Completed':
            return 'bg-green-50 text-green-700 border-green-200';
          case 'Processing':
            return 'bg-purple-50 text-purple-700 border-purple-200';
          case 'Pending':
            return 'bg-orange-50 text-orange-700 border-orange-200';
          case 'Failed':
            return 'bg-red-50 text-red-700 border-red-200';
          default:
            return 'bg-gray-50 text-gray-700 border-gray-200';
        }
      };

      return (
        <Badge className={`text-xs rounded-full border ${getStatusColor(status)}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    cell: () => {
      return (
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      );
    },
  },
];
