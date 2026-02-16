import { useQuery } from "@tanstack/react-query";
import { getAllFarms } from "../services/farmApi";

export const useFarms = (token) => {
  return useQuery({
    queryKey: ["farms", token],
    queryFn: async () => {
      const res = await getAllFarms(token);
      return res.farms || [];
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};