import { useQuery } from "@tanstack/react-query";
import { getFarmById } from "../services/farmApi";

export const useFarmDetails = (farmId, token) => {
  return useQuery({
    queryKey: ["farmDetails", farmId],
    queryFn: async () => {
      const farmData = await getFarmById(farmId, token);
      console.log(farmData.farm)
      return farmData.farm;
    },
    enabled: !!farmId,
  });
};