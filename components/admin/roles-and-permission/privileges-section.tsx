import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetAllModules from "@/hooks/query/useGetAllModules";
import useGetAllRoles from "@/hooks/query/useGetAllRoles";
import useGetModulePrivileges from "@/hooks/query/useGetModulePrivileges";
import { useState } from "react";
import ModulePermissions from "./module-permissions";
import PrivilegesActions from "./privileges-actions";
import { Privilege, privilegesColumns } from "./privileges-columns";
import { Module, Role, usePrivilegesLogic, usePrivilegesState } from "./privileges-hooks";
import RoleSelector from "./role-selector";

export default function PrivilegesSection() {
  const { data: rolesData, isPending: rolesLoading } = useGetAllRoles();
  const { data: modulesData, isPending: modulesLoading } = useGetAllModules();
  const [showPrivileges, setShowPrivileges] = useState<boolean>(false);

  // State management
  const { selectedRole, setSelectedRole, privileges, setPrivileges } = usePrivilegesState();
  const { data: privilegesData, isPending: privilegesLoading } = useGetModulePrivileges();



  // Data processing
  const roles: Role[] = rolesData?.data?.roles ?? [];
  const modules: Module[] = modulesData?.data?.data ?? [];
  const existingPrivileges: Privilege[] = privilegesData?.data?.data ?? [];

  // Business logic
  const {
    handleRoleChange,
    updatePrivilege,
    toggleAllPrivileges,
    isAllSelected,
    isPartiallySelected,
    handleSave,
    handleCancel,
    hasUnsavedChanges,
    isCreatingPrivilegeMapping
  } = usePrivilegesLogic(selectedRole, setSelectedRole, privileges, setPrivileges, modules, roles);

  if (rolesLoading || modulesLoading || privilegesLoading) {
    return <LoadingSpinner message={rolesLoading ? "Loading roles..." : modulesLoading ? "Loading modules..." : "Loading privileges..."} />;
  }





  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowPrivileges(!showPrivileges)} className="bg-theme-dark-green text-white">Add New Privileges</Button>
      </div>
      {showPrivileges && (
        <main>
          {/* Role Selection */}
          <RoleSelector
            roles={roles}
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
          />

          {/* Permissions Section */}
          <ModulePermissions
            modules={modules}
            privileges={privileges}
            selectedRole={selectedRole}
            onUpdatePrivilege={updatePrivilege}
            onToggleAllPrivileges={toggleAllPrivileges}
            isAllSelected={isAllSelected}
            isPartiallySelected={isPartiallySelected}
          />

          {/* Action Buttons */}
          <PrivilegesActions
            selectedRole={selectedRole}
            onSave={handleSave}
            onCancel={handleCancel}
            hasUnsavedChanges={hasUnsavedChanges}
            isCreatingPrivilegeMapping={isCreatingPrivilegeMapping}
          />
        </main>
      )}

      {!showPrivileges && (
        <main>
          {existingPrivileges.length > 0 ? (
            <DataTable columns={privilegesColumns} data={existingPrivileges} />
          ) : (
            <EmptyState
              title="No Privileges Found"
              description="No privileges have been created yet. Create new privileges to define role permissions."
              actionButton={
                <Button
                  onClick={() => setShowPrivileges(true)}
                  className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Add New Privileges
                </Button>
              }
            />
          )}
        </main>
      )}
    </div>
  );
}