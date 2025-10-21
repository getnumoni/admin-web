import { useState } from "react";
import { toast } from "sonner";

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface Module {
  id: string;
  moduleName: string | null;
}

export interface Privilege {
  id: string;
  roleId: string;
  roleName: string;
  moduleId: string;
  moduleName: string;
  privilegeCreate: boolean;
  privilegeDelete: boolean;
  privilegeView: boolean;
  privilegeUpdate: boolean;
}

export function usePrivilegesState() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [privileges, setPrivileges] = useState<Privilege[]>([]);

  return {
    selectedRole,
    setSelectedRole,
    privileges,
    setPrivileges
  };
}

export function usePrivilegesLogic(
  selectedRole: string,
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>,
  privileges: Privilege[],
  setPrivileges: React.Dispatch<React.SetStateAction<Privilege[]>>,
  displayModules: Module[],
  displayRoles: Role[]
) {
  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    const role = displayRoles.find(r => r.id === roleId);

    // Initialize privileges for all modules for the selected role
    const newPrivileges: Privilege[] = displayModules.map(module => ({
      id: `${roleId}-${module.id}`,
      roleId,
      roleName: role?.name || "",
      moduleId: module.id,
      moduleName: module.moduleName || "Unnamed Module",
      privilegeCreate: false,
      privilegeDelete: false,
      privilegeView: false,
      privilegeUpdate: false,
    }));

    setPrivileges(newPrivileges);
  };

  const updatePrivilege = (
    moduleId: string,
    privilegeType: keyof Omit<Privilege, 'id' | 'roleId' | 'roleName' | 'moduleId' | 'moduleName'>,
    value: boolean
  ) => {
    setPrivileges(prev =>
      prev.map(priv =>
        priv.moduleId === moduleId
          ? { ...priv, [privilegeType]: value }
          : priv
      )
    );
  };

  const toggleAllPrivileges = (moduleId: string, value: boolean) => {
    setPrivileges(prev =>
      prev.map(priv =>
        priv.moduleId === moduleId
          ? {
            ...priv,
            privilegeCreate: value,
            privilegeDelete: value,
            privilegeView: value,
            privilegeUpdate: value
          }
          : priv
      )
    );
  };

  const isAllSelected = (moduleId: string) => {
    const modulePrivileges = privileges.find(p => p.moduleId === moduleId);
    if (!modulePrivileges) return false;
    return modulePrivileges.privilegeCreate &&
      modulePrivileges.privilegeDelete &&
      modulePrivileges.privilegeView &&
      modulePrivileges.privilegeUpdate;
  };

  const isPartiallySelected = (moduleId: string) => {
    const modulePrivileges = privileges.find(p => p.moduleId === moduleId);
    if (!modulePrivileges) return false;
    const selectedCount = [
      modulePrivileges.privilegeCreate,
      modulePrivileges.privilegeDelete,
      modulePrivileges.privilegeView,
      modulePrivileges.privilegeUpdate
    ].filter(Boolean).length;
    return selectedCount > 0 && selectedCount < 4;
  };

  const handleSave = () => {
    console.log("Saving privileges:", privileges);

    // Filter out privileges that have no permissions set
    const activePrivileges = privileges.filter(priv =>
      priv.privilegeCreate || priv.privilegeDelete || priv.privilegeView || priv.privilegeUpdate
    );

    if (activePrivileges.length === 0) {
      toast.error("Please select at least one permission before saving.");
      return;
    }

    // TODO: Implement actual save API call
    // Example: await savePrivileges(activePrivileges);

    toast.success(`Successfully saved ${activePrivileges.length} privilege(s) for the selected role.`);
    console.log("Active privileges to save:", activePrivileges);
  };

  const handleCancel = () => {
    if (privileges.some(priv =>
      priv.privilegeCreate || priv.privilegeDelete || priv.privilegeView || priv.privilegeUpdate
    )) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel? All changes will be lost."
      );
      if (!confirmed) return;
    }

    setSelectedRole("");
    setPrivileges([]);
  };

  const hasUnsavedChanges = privileges.some(priv =>
    priv.privilegeCreate || priv.privilegeDelete || priv.privilegeView || priv.privilegeUpdate
  );

  return {
    handleRoleChange,
    updatePrivilege,
    toggleAllPrivileges,
    isAllSelected,
    isPartiallySelected,
    handleSave,
    handleCancel,
    hasUnsavedChanges
  };
}
