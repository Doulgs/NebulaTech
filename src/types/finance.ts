export type Kind = "out" | "in" | "tr";
export type Recurrence = "none" | "week" | "month" | "year";
export type Transaction = {
  id: number;
  name: string;
  cat: string;
  date: string;
  time: string;
  amount: number;
  type: Kind;
  account: string;
  member: string;
  recur?: string | null;
  recurIdx?: number;
  recurTotal?: number;
};
export type Category = {
  label: string;
  h: number;
  icon: string;
  total?: number;
  budget?: number;
};
export type Session = { name: string; email: string };
export type Message = { role: "assistant" | "user"; text: string };
export type FinanceData = {
  version: 1;
  transactions: Transaction[];
  categories: Record<string, Category>;
  expenseCategories: string[];
  locked: Record<string, boolean>;
  payments: Record<string, number>;
  invites: string[];
  chat: Message[];
  session: Session | null;
  hide: boolean;
};
