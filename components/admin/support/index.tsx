'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTicketTypeModal from "./add-ticket-type";
import CreateSupportTicket from "./create-support-ticket";
import SupportTabs from "./support-tabs";
import ViewSupportTickets from "./view-support-tickets";
import ViewTicketTypes from "./view-ticket-types";

export default function Support() {

  const [activeTab, setActiveTab] = useState<string>('ticket-type');
  const [isTicketTypeModalOpen, setIsTicketTypeModalOpen] = useState<boolean>(false);
  const [showCreateTicket, setShowCreateTicket] = useState<boolean>(false);


  const handleOpenTicketTypeModal = () => {
    setIsTicketTypeModalOpen(true);
  };

  const handleCloseTicketTypeModal = () => {
    setIsTicketTypeModalOpen(false);
  };

  const handleCreateTicket = () => {
    setShowCreateTicket(true);
  };

  const handleBackFromCreateTicket = () => {
    setShowCreateTicket(false);
  };
  return (
    <main className="p-3">
      <div className="min-h-screen bg-gray-50 mt-2">


        <div className="max-w-7xl mx-auto">
          {showCreateTicket ? (
            <CreateSupportTicket onBack={handleBackFromCreateTicket} />
          ) : (
            <main>
              <div className="flex justify-end items-center">
                <Button
                  className=" bg-theme-dark-green text-white hover:bg-theme-dark-green/90"
                  onClick={handleCreateTicket}
                >
                  Create Support Ticket
                </Button>
              </div>
              <SupportTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {activeTab === "ticket-type" && (
                <div className="mt-6">
                  <div className="flex justify-end items-center mb-6">
                    {/* <h1 className="text-2xl font-bold">View Ticket Types</h1> */}
                    <Button
                      className="bg-theme-dark-green text-white"
                      onClick={handleOpenTicketTypeModal}
                    >
                      <Plus className="w-4 h-4" />
                      Add Ticket Type
                    </Button>
                  </div>
                  <div>
                    {/* <RolesSection /> */}
                  </div>
                </div>
              )}

              {activeTab === "ticket-type" && (
                <ViewTicketTypes />
              )}

              {activeTab === "support-ticket" && (
                <ViewSupportTickets />
              )}
            </main>
          )}
        </div>
      </div>

      <AddTicketTypeModal
        isOpen={isTicketTypeModalOpen}
        onClose={handleCloseTicketTypeModal}
      />

    </main>
  );
}