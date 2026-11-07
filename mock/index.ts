import type { FinanceData, Message, Transaction } from "../src/types";
import seed from "./seed.json";
export { seed };
export const suggestions = [
  "Quanto gastei com mercado este mês?",
  "Quem da família gastou mais?",
  "Quais contas recorrentes vencem em breve?",
  "Onde posso economizar R$ 500?",
];
export function initialData(): FinanceData {
  return {
    version: 1,
    transactions: JSON.parse(
      JSON.stringify(seed.transactions),
    ) as Transaction[],
    categories: JSON.parse(JSON.stringify(seed.categories)),
    expenseCategories: [...seed.expenseCategories],
    locked: {},
    payments: {},
    invites: [...seed.summary.invites],
    chat: [seed.chat as Message],
    session: null,
    hide: false,
  };
}
