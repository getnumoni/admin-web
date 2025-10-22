import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface Module {
  id: string;
  moduleName: string | null;
}

interface Privilege {
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

interface ModulePermissionsProps {
  modules: Module[];
  privileges: Privilege[];
  selectedRole: string;
  onUpdatePrivilege: (moduleId: string, privilegeType: keyof Omit<Privilege, 'id' | 'roleId' | 'roleName' | 'moduleId' | 'moduleName'>, value: boolean) => void;
  onToggleAllPrivileges: (moduleId: string, value: boolean) => void;
  isAllSelected: (moduleId: string) => boolean;
  isPartiallySelected: (moduleId: string) => boolean;
}

export default function ModulePermissions({
  modules,
  privileges,
  selectedRole,
  onUpdatePrivilege,
  onToggleAllPrivileges,
  isAllSelected,
  isPartiallySelected
}: ModulePermissionsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Permissions</h2>

      <Accordion type="multiple" className="space-y-2">
        {modules.map((module) => {
          const modulePrivileges = privileges.find(p => p.moduleId === module.id);

          // If no role is selected, show modules without privileges
          if (!selectedRole) {
            return (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="border border-gray-200 rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">
                        {module.moduleName || "Unnamed Module"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Permission settings for {module.moduleName?.toLowerCase() || "this module"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-4 pb-6">
                  <div className="text-center py-8 text-gray-500">
                    Please select a role to manage permissions for this module.
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          }

          if (!modulePrivileges) return null;

          return (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="border border-gray-200 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">
                      {module.moduleName || "Unnamed Module"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Permission settings for {module.moduleName?.toLowerCase() || "this module"}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
                    <Checkbox
                      id={`select-all-${module.id}`}
                      checked={isAllSelected(module.id)}
                      ref={(el) => {
                        if (el) (el as HTMLInputElement).indeterminate = isPartiallySelected(module.id);
                      }}
                      onCheckedChange={(checked) =>
                        onToggleAllPrivileges(module.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`select-all-${module.id}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Select All
                    </label>
                  </div>

                  {/* Individual Permissions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`create-${module.id}`}
                        checked={modulePrivileges.privilegeCreate}
                        onCheckedChange={(checked) =>
                          onUpdatePrivilege(module.id, 'privilegeCreate', checked as boolean)
                        }
                      />
                      <label htmlFor={`create-${module.id}`} className="text-sm text-gray-700">
                        Create
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`delete-${module.id}`}
                        checked={modulePrivileges.privilegeDelete}
                        onCheckedChange={(checked) =>
                          onUpdatePrivilege(module.id, 'privilegeDelete', checked as boolean)
                        }
                      />
                      <label htmlFor={`delete-${module.id}`} className="text-sm text-gray-700">
                        Delete
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`view-${module.id}`}
                        checked={modulePrivileges.privilegeView}
                        onCheckedChange={(checked) =>
                          onUpdatePrivilege(module.id, 'privilegeView', checked as boolean)
                        }
                      />
                      <label htmlFor={`view-${module.id}`} className="text-sm text-gray-700">
                        View
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`update-${module.id}`}
                        checked={modulePrivileges.privilegeUpdate}
                        onCheckedChange={(checked) =>
                          onUpdatePrivilege(module.id, 'privilegeUpdate', checked as boolean)
                        }
                      />
                      <label htmlFor={`update-${module.id}`} className="text-sm text-gray-700">
                        Update
                      </label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
