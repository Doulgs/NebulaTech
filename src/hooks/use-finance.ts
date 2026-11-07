import { financeService, type FinanceUpdate } from "@/services/finance-service";
import { queryClient } from "@/services/query-client";
import { queryKeys } from "@/services/query-keys";
import { useFeedbackStore } from "@/stores/feedback-store";
import { useQuery } from "@tanstack/react-query";

export function useFinanceQuery() {
  return useQuery({
    queryKey: queryKeys.finance,
    queryFn: financeService.load,
  });
}

export async function saveFinance(update: FinanceUpdate) {
  try {
    const data = await financeService.update(update);
    queryClient.setQueryData(queryKeys.finance, data);
    useFeedbackStore.getState().clearError();
  } catch (error) {
    useFeedbackStore
      .getState()
      .setError(
        "Não foi possível salvar. Seu formulário foi preservado; tente novamente.",
      );
    throw error;
  }
}

export function useFinance() {
  const query = useFinanceQuery();
  const error = useFeedbackStore((state) => state.error);
  const clearError = useFeedbackStore((state) => state.clearError);
  if (!query.data)
    throw new Error("Os dados financeiros ainda não foram carregados.");
  return { data: query.data, save: saveFinance, error, clearError };
}
