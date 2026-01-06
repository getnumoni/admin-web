"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, Image, MessageSquare, MoreVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Support Ticket type definition based on API response
export type SupportTicket = {
  id: string;
  userId: string;
  name: string;
  userType: "CUSTOMER" | "MERCHANT";
  ticketType: string | null;
  description: string | null;
  assignToName: string | null;
  assignToId: string | null;
  department: string | null;
  priority: string | null;
  ticketTitle: string | null;
  closingDate: string | null;
  raiseDate: string | null;
  status: "OPEN" | "CLOSE" | null;
  remarks: string | null;
  createAt: string;
  updateAt: string;
  imagepath: Array<{
    id: string;
    supportId: string;
    imagePath: string | null;
  }>;
};

// Column definitions
export const supportTicketColumns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {ticket?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {ticket?.name}
            </div>
            <div className="text-xs text-gray-500">
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                {ticket.userType}
              </Badge>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;
      //handle copy functionality
      const handleCopyUserId = async () => {
        await navigator.clipboard.writeText(userId);
        toast.success("Transaction link copied to clipboard");

      }
      return (
        <div className="flex gap-2 items-center">
          <span className="text-sm">
            {userId}
          </span>
          <Button
            type="button"
            size="sm"
            className="h-8 w-8 p-0 bg-theme-dark-green"
            onClick={handleCopyUserId}
            title="Copy Transaction Link"
          >
            <Copy className="h-2 w-2" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketType",
    header: "Ticket Type",
    cell: ({ row }) => {
      const ticketType = row.getValue("ticketType") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {ticketType ? (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              {ticketType}
            </Badge>
          ) : (
            <span className="text-gray-400">Not specified</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 truncate">
            {description || "No description"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "assignToName",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignToName = row.getValue("assignToName") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {assignToName ? (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {assignToName}
            </Badge>
          ) : (
            <span className="text-gray-400">Unassigned</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | null;
      const getStatusColor = (status: string | null) => {
        switch (status) {
          case "OPEN":
            return "bg-yellow-50 text-yellow-700 border-yellow-200";
          case "CLOSED":
            return "bg-green-50 text-green-700 border-green-200";
          case "RESOLVED":
            return "bg-green-50 text-green-700 border-green-200";
          default:
            return "bg-gray-50 text-gray-700 border-gray-200";
        }
      };

      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status || "Unknown"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "raiseDate",
    header: "Raised Date",
    cell: ({ row }) => {
      const raiseDate = row.getValue("raiseDate") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {raiseDate || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "imagepath",
    header: "Attachments",
    cell: ({ row }) => {
      const imagepath = row.getValue("imagepath") as Array<{ id: string; supportId: string; imagePath: string | null }>;
      const hasImages = imagepath && imagepath.length > 0 && imagepath.some(img => img.imagePath);

      return (
        <div className="flex items-center">
          {hasImages ? (
            <div className="flex items-center gap-1">
              <Image className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span className="text-xs text-blue-600">
                {imagepath.filter(img => img.imagePath).length} file(s)
              </span>
            </div>
          ) : (
            <span className="text-gray-400 text-xs">No files</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/support/${ticket.id}`}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Add Comment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Close Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
