import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetAllCharityParams {
  page?: number;
  size?: number;
  charityName?: string;
  contactEmail?: string;
  charityRegNumber?: string;
  createdDate?: string;
}

const useGetAllCharity = (params: GetAllCharityParams = {}) => {
  const {
    page = 0,
    size = 20,
    charityName,
    contactEmail,
    charityRegNumber,
    createdDate,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["charity", page, size, charityName, contactEmail, charityRegNumber, createdDate],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filter parameters
      if (charityName) queryParams.append("charityName", charityName);
      if (contactEmail) queryParams.append("contactEmail", contactEmail);
      if (charityRegNumber) queryParams.append("charityRegNumber", charityRegNumber);
      if (createdDate) queryParams.append("createdDate", createdDate);

      const queryString = queryParams.toString();
      return api.get(`/admin/charity/getCharityList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllCharity;