import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; 

export const useTransactionsHook = () => {
  const queryClient = useQueryClient();

  // 1. Get Data
  const { data: transactions = [], isLoading, isRefetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: api.getTransactions,
  });

  // 2. Add Data
  const addMutation = useMutation({
    mutationFn: api.addTransaction,
    onSuccess: () => {
      // This tells React Query the cached data is old
      // It will trigger getTransactions() again automatically
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions,
    isLoading,
    isRefetching,
    addTransaction: addMutation.mutate,
    isAdding: addMutation.isPending,
  };
};