export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log(id);

  return <div>CustomerDetails</div>;
}