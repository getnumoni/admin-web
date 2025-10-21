import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetAllModules from "@/hooks/query/useGetAllModules";
import useGetAllRoles from "@/hooks/query/useGetAllRoles";
import ModulePermissions from "./module-permissions";
import PrivilegesActions from "./privileges-actions";
import { Module, Role, usePrivilegesLogic, usePrivilegesState } from "./privileges-hooks";
import RoleSelector from "./role-selector";

export default function PrivilegesSection() {
  const { data: rolesData, isPending: rolesLoading } = useGetAllRoles();
  const { data: modulesData, isPending: modulesLoading } = useGetAllModules();

  // State management
  const { selectedRole, setSelectedRole, privileges, setPrivileges } = usePrivilegesState();

  // Data processing
  const roles: Role[] = rolesData?.data?.data ?? [];
  const modules: Module[] = modulesData?.data?.data ?? [];

  // Business logic
  const {
    handleRoleChange,
    updatePrivilege,
    toggleAllPrivileges,
    isAllSelected,
    isPartiallySelected,
    handleSave,
    handleCancel,
    hasUnsavedChanges
  } = usePrivilegesLogic(selectedRole, setSelectedRole, privileges, setPrivileges, modules, roles);

  if (rolesLoading || modulesLoading) {
    return <LoadingSpinner message={rolesLoading ? "Loading roles..." : "Loading modules..."} />;
  }



  return (
    <div className="space-y-6">
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
      />
    </div>
  );
}