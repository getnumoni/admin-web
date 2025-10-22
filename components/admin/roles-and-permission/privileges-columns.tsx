"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// Privilege type definition based on API response
export type Privilege = {
  id: string;
  roleId: string;
  roleName: string;
  moduleId: string;
  moduleName: string;
  privilegeCreate: boolean;
  privilegeUpdate: boolean;
  privilegeDelete: boolean;
  privilegeView: boolean;
};

// Column definitions
export const privilegesColumns: ColumnDef<Privilege>[] = [
  {
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => {
      const roleName = row.getValue("roleName") as string;
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {roleName}
        </Badge>
      );
    },
  },
  {
    accessorKey: "moduleName",
    header: "Module",
    cell: ({ row }) => {
      const moduleName = row.getValue("moduleName") as string;
      return (
        <div className="font-medium text-gray-900">
          {moduleName}
        </div>
      );
    },
  },
  {
    accessorKey: "privilegeCreate",
    header: "Create",
    cell: ({ row }) => {
      const hasCreate = row.getValue("privilegeCreate") as boolean;
      return (
        <Badge
          variant={hasCreate ? "default" : "secondary"}
          className={hasCreate ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}
        >
          {hasCreate ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "privilegeView",
    header: "View",
    cell: ({ row }) => {
      const hasView = row.getValue("privilegeView") as boolean;
      return (
        <Badge
          variant={hasView ? "default" : "secondary"}
          className={hasView ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}
        >
          {hasView ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "privilegeUpdate",
    header: "Update",
    cell: ({ row }) => {
      const hasUpdate = row.getValue("privilegeUpdate") as boolean;
      return (
        <Badge
          variant={hasUpdate ? "default" : "secondary"}
          className={hasUpdate ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}
        >
          {hasUpdate ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "privilegeDelete",
    header: "Delete",
    cell: ({ row }) => {
      const hasDelete = row.getValue("privilegeDelete") as boolean;
      return (
        <Badge
          variant={hasDelete ? "default" : "secondary"}
          className={hasDelete ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}
        >
          {hasDelete ? "Yes" : "No"}
        </Badge>
      );
    },
  },
];
