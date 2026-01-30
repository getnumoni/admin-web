import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetAllMerchantsParams {
  page?: number;
  size?: number;
  businessName?: string;
  merchantEmail?: string;
  merchantPhoneNo?: string;
  merchantId?: string;
  startDate?: string;
  endDate?: string;
  approvalStatus?: string;
}

const useGetAllMerchants = (params: GetAllMerchantsParams = {}) => {
  const {
    page = 0,
    size = 10,
    businessName,
    merchantEmail,
    merchantPhoneNo,
    merchantId,
    startDate,
    endDate,
    approvalStatus,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchants", page, size, businessName, merchantEmail, merchantPhoneNo, merchantId, startDate, endDate, approvalStatus],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filter parameters
      if (businessName) queryParams.append("businessName", businessName);
      if (merchantEmail) queryParams.append("merchantEmail", merchantEmail);
      if (merchantPhoneNo) queryParams.append("merchantPhoneNo", merchantPhoneNo);
      if (merchantId) queryParams.append("merchantId", merchantId);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);
      if (approvalStatus) queryParams.append("approvalStatus", approvalStatus);

      const queryString = queryParams.toString();
      return api.get(`/admin/getMerchantList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllMerchants;