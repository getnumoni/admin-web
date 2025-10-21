'use client'

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddModuleModal from "./add-module-modal";
import AddRoleModal from "./add-role-modal";
import ModulesSection from "./modules-section";
import PrivilegesSection from "./privileges-section";
import RolesSection from "./roles-section";
import RolesTabs from "./roles-tab";

export default function ViewRoles() {

  const [activeTab, setActiveTab] = useState("roles");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // handle module modal open
  const handleOpenModuleModal = () => {
    setIsModuleModalOpen(true);
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="min-h-screen bg-gray-50 mt-2">
        <div className="max-w-7xl mx-auto">
          <RolesTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "roles" && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Roles</h1>
                <Button
                  className="bg-theme-dark-green text-white"
                  onClick={handleOpenModal}
                >
                  <Plus className="w-4 h-4" />
                  Add Role
                </Button>
              </div>
              <div>
                <RolesSection />
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Modules</h1>
                <Button
                  className="bg-theme-dark-green text-white"
                  onClick={handleOpenModuleModal}
                >
                  <Plus className="w-4 h-4" />
                  Add Module
                </Button>
              </div>
              <div>
                <ModulesSection />
              </div>
            </div>
          )}

          {activeTab === "privileges" && (
            <PrivilegesSection />
          )}
        </div>
      </div>

      <AddRoleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <AddModuleModal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
      />
    </div>
  )
}
