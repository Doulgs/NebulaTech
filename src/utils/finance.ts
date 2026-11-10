import type { FinanceData, Recurrence, Transaction } from "@/types";
import seed from "../../mock/seed.json";
export const money = (n: number) =>
  "R$ " +
  Math.abs(n).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export const signedMoney = (n: number) => `${n >= 0 ? "+ " : "− "}${money(n)}`;
export const shortDate = (s: string) =>
  new Date(s + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
  });
export const parseMoney = (s: string) =>
  Number(
    s
      .trim()
      .replace(/\s|R\$/g, "")
      .replace(/\./g, "")
      .replace(",", "."),
  );
export const validEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s.trim());
export const color = (h: number) =>
  ({
    295: "#B79CFF",
    340: "#EF95CB",
    70: "#F0D190",
    250: "#8FB5FF",
    200: "#81D8E5",
    20: "#F49C9E",
    160: "#80DBB4",
    110: "#BEDB8D",
    275: "#AB99F2",
  })[h] || "#B79CFF";
export const recurrenceLabels: Record<string, string> = {
  none: "Única",
  week: "Semanal",
  month: "Mensal",
  year: "Anual",
};
export function addDate(iso: string, rec: Recurrence, i: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date =
    rec === "week"
      ? new Date(y, m - 1, d + 7 * i)
      : rec === "year"
        ? new Date(y + i, m - 1, 1)
        : new Date(y, m - 1 + (rec === "month" ? i : 0), 1);
  if (rec !== "week")
    date.setDate(
      Math.min(
        d,
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      ),
    );
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export const isCompleted = (t: Transaction) => t.date <= seed.today;
export const sorted = (ts: Transaction[]) =>
  [...ts].sort(
    (a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time),
  );
export function totals(data: FinanceData) {
  const extra = data.transactions.filter(
    (t) => !seed.transactions.some((s) => s.id === t.id) && isCompleted(t),
  );
  const monthExtra = extra.filter(
    (t) => t.date.slice(0, 7) === seed.today.slice(0, 7),
  );
  const expense =
    seed.summary.expense +
    monthExtra
      .filter((t) => t.type === "out")
      .reduce((s, t) => s - t.amount, 0);
  const income =
    seed.summary.income +
    monthExtra.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
  const category = (id: string) =>
    (data.categories[id]?.total || 0) +
    monthExtra
      .filter((t) => t.cat === id && t.type !== "tr")
      .reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance =
    seed.accounts.reduce((s, a) => s + a.bal, 0) +
    extra
      .filter((t) => t.account === "Nebula Conta")
      .reduce((s, t) => s + t.amount, 0);
  return { expense, income, category, balance, extra };
}
export function answer(question: string, data: FinanceData) {
  const q = question.toLowerCase(),
    sum = totals(data);
  if (/mercado|categoria/.test(q))
    return `Os gastos com Mercado somam ${money(sum.category("mercado"))} em outubro. O orçamento é ${money(data.categories.mercado.budget || 0)}. Você pode conferir cada lançamento em Atividades.`;
  if (/família|familia|quem|membro/.test(q)) {
    const list = seed.members
      .map((m) => ({
        name: m.first,
        amount: data.transactions
          .filter(
            (t) => t.member === m.id && t.type === "out" && isCompleted(t),
          )
          .reduce((s, t) => s - t.amount, 0),
      }))
      .sort((a, b) => b.amount - a.amount);
    return `Nos lançamentos disponíveis, ${list[0].name} teve a maior despesa: ${money(list[0].amount)}. ${list.map((m) => `${m.name}: ${money(m.amount)}`).join(" · ")}.`;
  }
  if (/recorr|venc|conta/.test(q))
    return (
      "Próximos lançamentos recorrentes: " +
      data.transactions
        .filter((t) => t.recur && !isCompleted(t))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4)
        .map((t) => `${t.name}, ${money(t.amount)} em ${shortDate(t.date)}`)
        .join("; ") +
      "."
    );
  if (/econom|500|orçamento/.test(q))
    return `Compras soma ${money(sum.category("compras"))}, acima do orçamento de ${money(data.categories.compras.budget || 0)}. Rever esse limite e reduzir restaurantes é um ponto de partida. Sua sobra no mês é ${money(sum.income - sum.expense)}.`;
  if (/saldo|resumo|receita|gasto/.test(q))
    return `Em outubro: receitas de ${money(sum.income)}, despesas de ${money(sum.expense)} e saldo total de ${money(sum.balance)}. Você poupou ${(((sum.income - sum.expense) / sum.income) * 100).toFixed(1)}% da renda.`;
  return "Posso consultar o resumo do mês, gastos com mercado, despesas por membro e contas recorrentes. Qual desses dados você quer ver?";
}
