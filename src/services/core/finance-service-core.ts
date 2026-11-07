import type { FinanceData } from "@/types";

export type FinanceUpdate = (data: FinanceData) => FinanceData;
export type FinanceRepository = {
  load: () => Promise<FinanceData>;
  save: (data: FinanceData) => Promise<void>;
};

/** The repository is the only boundary to replace when the backend is connected. */
export function createFinanceService(repository: FinanceRepository) {
  let current: FinanceData | undefined;
  let loading: Promise<FinanceData> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  const load = () => {
    if (current) return Promise.resolve(current);
    if (!loading) {
      loading = repository
        .load()
        .then((data) => {
          current = data;
          return data;
        })
        .finally(() => {
          loading = undefined;
        });
    }
    return loading;
  };
  return {
    load,
    update(update: FinanceUpdate) {
      const operation = queue
        .catch(() => {})
        .then(async () => {
          const previous = await load();
          const next = update(previous);
          await repository.save(next);
          current = next;
          return next;
        });
      queue = operation;
      return operation;
    },
  };
}
