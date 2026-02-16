import { useQuery } from "@tanstack/react-query";
import { getCropsByFarmId } from "../services/farmApi";

export const useFarmCrops = (farmId, userToken) => {
  return useQuery({
    queryKey: ["farmCrops", farmId],

    queryFn: async () => {
      if (!farmId) return [];

      const response = await getCropsByFarmId(farmId, userToken);

      if (!response.success) {
        throw new Error("Failed to fetch crops");
      }

      return response.crops;
    },

    enabled: !!farmId, // Only run if farmId exists
  });
};