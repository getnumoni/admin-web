import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetAllRoles from "@/hooks/query/useGetAllRoles";
import { User } from "lucide-react";
import { Role } from "./privileges-hooks";

export default function RolesSection() {
  const { data, isPending, isError, error, refetch } = useGetAllRoles();

  const roles: Role[] = data?.data?.roles ?? [];

  // const handleDeleteRole = (roleId: string) => {
  //   console.log("Delete role:", roleId);
  //   // TODO: Implement delete role functionality
  // };

  if (isPending) {
    return <LoadingSpinner message="Loading roles..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error Loading Roles"
        message={error?.message || "Failed to load roles. Please try again."}
        onRetry={refetch}
        retryText="Try Again"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <div
          key={role.id}
          className="bg-white rounded-lg p-3 duration-200"
        >
          {/* Header with icon and title */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-theme-dark-green/10 rounded-full flex items-center justify-center">
                <div className="text-theme-dark-green">
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-900">
                  {role.name}
                </h3>
                {role.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {role.description}
                  </p>
                )}
              </div>
            </div>

            {/* 3 dots menu */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete Role
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      ))}

      {/* Empty state */}
      {roles.length === 0 && (
        <div className="col-span-full">
          <EmptyState
            title="No roles found"
            description="Get started by creating your first role to define user permissions."
          />
        </div>
      )}
    </div>
  );
}