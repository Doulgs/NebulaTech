import { useFinance } from "@/hooks/use-finance";
import { seed } from "@/mock";
import { totals } from "@/utils/finance";
import { useState } from "react";

export function useWallet() {
  const { data, save } = useFinance();
  const [index, setIndex] = useState(0),
    [confirm, setConfirm] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const card = seed.cards[index],
    sum = totals(data);
  const paid = data.payments[card.name] || 0,
    used = Math.max(0, card.used - paid);
  async function pay() {
    setError("");
    if (used <= 0 || busy) return;
    if (
      seed.accounts[0].bal + sum.extra.filter((t) => t.account === "Nebula Conta").reduce((s, t) => s + t.amount, 0) <
      used
    )
      return setError("Saldo insuficiente para pagar a fatura.");
    setBusy(true);
    try {
      await save((d) => ({
        ...d,
        payments: { ...d.payments, [card.name]: card.used },
        transactions: [
          {
            id: Date.now(),
            name: `Pagamento fatura · ${card.name}`,
            cat: "transf",
            date: seed.today,
            time: "21:30",
            amount: -used,
            type: "tr",
            account: "Nebula Conta",
            member: "Douglas",
          },
          ...d.transactions,
        ],
      }));
      setConfirm(false);
    } catch {
      setError("Falha ao salvar pagamento local. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return {
    data,
    save,
    index,
    setIndex,
    confirm,
    setConfirm,
    busy,
    error,
    setError,
    card,
    sum,
    paid,
    used,
    pay,
  };
}
