import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface RoleSelectorProps {
  roles: Role[];
  selectedRole: string;
  onRoleChange: (roleId: string) => void;
}

export default function RoleSelector({ roles, selectedRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a role to manage permissions" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
