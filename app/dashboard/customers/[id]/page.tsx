import CustomerDetails from "@/components/admin/customers/customer-details";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <CustomerDetails customerId={id} />;
}