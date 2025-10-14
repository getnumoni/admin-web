import CharityDetails from "@/components/admin/charity/charity-details";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <CharityDetails charityId={id} />;
}