import { mockRepository } from "../../mock/storage";
import { createFinanceService } from "./core/finance-service-core";

export type { FinanceUpdate } from "./core/finance-service-core";
export const financeService = createFinanceService(mockRepository);
