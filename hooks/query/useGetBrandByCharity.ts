import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UseGetBrandByCharityProps {
  charityId: string;
}

const useGetBrandByCharity = ({ charityId }: UseGetBrandByCharityProps) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["charity", "brand", charityId],
    queryFn: () => api.get(`/admin/charity/brandsByCharity?charityId=${charityId}`),
    enabled: !!charityId && charityId.trim() !== "",
  });

  return { data: data?.data, isPending, error, isError, refetch };
};

export default useGetBrandByCharity;
