import { isCompleted, sorted, totals } from "@/utils/finance";
import { useState } from "react";
import { useFinance } from "./use-finance";

export function useDashboard() {
  const { data, save } = useFinance();
  const [calendar, setCalendar] = useState(false);
  const [day, setDay] = useState(19);
  const [filter, setFilter] = useState("all");
  const sum = totals(data);
  const items = sorted(data.transactions)
    .filter(isCompleted)
    .filter((tx) => filter === "all" || filter === tx.type)
    .slice(0, 5);
  const days = [
    ...Array(4).fill(0),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ];
  const dayItems = sorted(data.transactions).filter(
    (tx) => tx.date === `2026-10-${String(day).padStart(2, "0")}`,
  );
  return {
    data,
    sum,
    calendar,
    setCalendar,
    day,
    setDay,
    filter,
    setFilter,
    items,
    days,
    dayItems,
    togglePrivacy: () => {
      void save((current) => ({ ...current, hide: !current.hide })).catch(
        () => {},
      );
    },
  };
}
