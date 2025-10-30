import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllAuditTrailList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["audit-trail"],
    queryFn: () => api.get("/admin/auditTrailList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllAuditTrailList;