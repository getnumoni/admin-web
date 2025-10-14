import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UseGetCharityDetailsByIdProps {
  charityId: string;
}

const useGetCharityDetailsById = ({ charityId }: UseGetCharityDetailsByIdProps) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["charity", charityId],
    queryFn: () => api.get(`/admin/getCharityById/${charityId}`),
    enabled: !!charityId,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCharityDetailsById;
