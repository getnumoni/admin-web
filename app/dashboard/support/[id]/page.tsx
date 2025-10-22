import SupportTicketDetails from "@/components/admin/support/support-ticket-details";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <SupportTicketDetails ticketId={id} />
    </div>
  );
}