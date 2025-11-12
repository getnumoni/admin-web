import { Skeleton } from "../ui/skeleton";

function PointsSkeletonItem() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex flex-col h-full">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-4 w-40 mt-6 mb-3" />
        <div className="mt-auto">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}


export function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <PointsSkeletonItem key={index} />
      ))}
    </div>
  );
}